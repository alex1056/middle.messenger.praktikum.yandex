"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;

var _renderDom = require("../../utils/render-dom");

var _isEqual = require("../../utils/is-equal");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Route = /*#__PURE__*/function () {
  function Route(pathname, view, props) {
    _classCallCheck(this, Route);

    _defineProperty(this, "_pathname", void 0);

    _defineProperty(this, "_blockClass", void 0);

    _defineProperty(this, "_block", void 0);

    _defineProperty(this, "_props", void 0);

    _defineProperty(this, "_params", void 0);

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._params = null;
  }

  _createClass(Route, [{
    key: "navigate",
    value: function navigate(pathname) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      if (this._block) {
        this._block.hide();
      }
    }
  }, {
    key: "match",
    value: function match(pathname) {
      var pattern = '/chats/:chatId';

      if ((0, _isEqual.isEqual)(pathname, this._pathname)) {
        return true;
      }

      if (pattern === this._pathname) {
        var routeMatcher = new RegExp(pattern.replace(/:[^\s/?]+/g, '([\\w-]+)'));
        var isRoute = pathname.match(routeMatcher);

        if (isRoute) {
          this._params = {
            activeChatId: Number(isRoute[1])
          };
          return true;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._block) {
        this._block = new this._blockClass(_objectSpread(_objectSpread({}, this._props), this._params));

        if (this._props && this._block) {
          var node = this._block.getContent();

          (0, _renderDom.renderDOM)(this._props.rootQuery, node);
        } else {
          throw new Error('Не задан root элемент для монтирования в DOM!');
        }

        return;
      }

      this._block.setProps(_objectSpread(_objectSpread(_objectSpread({}, this._block.props), this._props), this._params));

      var nodeToRemove = document.querySelector('.main');

      if (nodeToRemove) {
        var _this$_props;

        nodeToRemove.remove();

        var _node = this._block.getContent();

        (0, _renderDom.renderDOM)((_this$_props = this._props) === null || _this$_props === void 0 ? void 0 : _this$_props.rootQuery, _node);
      }

      this._block.show();
    }
  }]);

  return Route;
}();

exports.Route = Route;