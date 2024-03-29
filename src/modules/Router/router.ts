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

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route: IRoute | undefined = this.getRoute(pathname);

    if (this._currentRoute) {
      if (this._currentRoute._pathname !== '/' && route?._pathname !== '/chats/:chatId') {
        if (this._currentRoute._pathname !== route?._pathname && this._currentRoute._pathname !== '/404') {
          this._currentRoute.leave();
        }
      }
    }

    this._currentRoute = route;
    if (route) {
      route.render(route, pathname);
    }
  }

  go(state: {}, title: string, pathname: string) {
    this.history.pushState(state, title, pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route: IRoute | undefined = this.routes.find((route1) => route1.match(pathname));
    if (!route) {
      return this.routes.find((route1) => {
        this.history.pushState({ url: '/404' }, '', '/404');
        return route1.match('/404');
      });
    }
    return this.routes.find((route1) => route1.match(pathname));
  }
}
