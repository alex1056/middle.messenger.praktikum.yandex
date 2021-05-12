import { Route, IRoute } from '../Route';

interface IRouter {
  routes: IRoute[];
  history: History;
  _currentRoute: any;
  _rootQuery: string;
}

export class Router implements IRouter {
  routes: IRoute[];

  history: History;

  _currentRoute: any;

  _rootQuery: string;

  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route: IRoute = new Route(pathname, block, { rootQuery: this._rootQuery });
    // console.log('use, pathname', pathname);
    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route: IRoute | undefined = this.getRoute(pathname);
    // console.log('Из _onRoute pathname, route', pathname, route);
    if (this._currentRoute) {
      console.log('this._currentRoute, route', this._currentRoute, route);
      // если мы уже на каком-то руте - мы его скрываем
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    if (route) {
      console.log('Перед Render, route=', route);
      route.render(route, pathname);
    }
  }

  go(state: {}, pathname: string) {
    this.history.pushState(state, '', pathname);
    this._onRoute(pathname);
  }

  // go(pathname: string) {
  //   this.history.pushState({}, '', pathname);
  //   this._onRoute(pathname);
  // }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    // console.log(this.routes);
    const route: IRoute | undefined = this.routes.find((route1) => {
      // if (route1.match(pathname)) {
      // console.log('Совпадает!', route1, pathname, route1.match(pathname));
      // }
      return route1.match(pathname);
    });
    if (!route) {
      return this.routes.find((route1) => route1.match('/404'));
    }
    return this.routes.find((route1) => route1.match(pathname));
  }
}
