"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _Route = require("../Route");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Router = /*#__PURE__*/function () {
  function Router(rootQuery) {
    _classCallCheck(this, Router);

    _defineProperty(this, "routes", void 0);

    _defineProperty(this, "history", void 0);

    _defineProperty(this, "_currentRoute", void 0);

    _defineProperty(this, "_rootQuery", void 0);

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  _createClass(Router, [{
    key: "use",
    value: function use(pathname, block) {
      var route = new _Route.Route(pathname, block, {
        rootQuery: this._rootQuery
      });
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      // Реагируем на изменения в адресной строке и вызываем перерисовку
      window.onpopstate = function (event) {
        _this._onRoute(event.currentTarget.location.pathname);
      }; // console.log('Route, start=window.location.pathname=', window.location.pathname);


      this._onRoute(window.location.pathname);
    }
  }, {
    key: "_onRoute",
    value: function _onRoute(pathname) {
      var route = this.getRoute(pathname);

      if (this._currentRoute) {// console.log('this._currentRoute._pathname', this._currentRoute._pathname);
      } // console.log('route._pathname', route?._pathname);


      if (this._currentRoute) {
        if (this._currentRoute._pathname !== '/' && (route === null || route === void 0 ? void 0 : route._pathname) !== '/chats/:chatId') {
          if (this._currentRoute._pathname !== (route === null || route === void 0 ? void 0 : route._pathname)) {
            this._currentRoute.leave();
          }
        }
      }

      this._currentRoute = route;

      if (route) {
        route.render(route, pathname);
      }
    }
  }, {
    key: "go",
    value: function go(state, pathname) {
      this.history.pushState(state, '', pathname);

      this._onRoute(pathname);
    }
  }, {
    key: "back",
    value: function back() {
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      this.history.forward();
    }
  }, {
    key: "getRoute",
    value: function getRoute(pathname) {
      // console.log(this.routes);
      var route = this.routes.find(function (route1) {
        return route1.match(pathname);
      });

      if (!route) {
        return this.routes.find(function (route1) {
          return route1.match('/404');
        });
      }

      return this.routes.find(function (route1) {
        return route1.match(pathname);
      });
    }
  }]);

  return Router;
}();

exports.Router = Router;

_defineProperty(Router, "__instance", void 0);