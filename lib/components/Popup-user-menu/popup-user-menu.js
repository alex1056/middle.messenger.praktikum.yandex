"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupUserMenu = void 0;

var _pug = require("pug");

var _Block2 = require("../Block");

var _template = require("./template");

require("./style.scss");

var _Store = require("../../modules/Store");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var store = (0, _Store.createStore)();

var PopupUserMenu = /*#__PURE__*/function (_Block) {
  _inherits(PopupUserMenu, _Block);

  var _super = _createSuper(PopupUserMenu);

  function PopupUserMenu(props) {
    var _this;

    _classCallCheck(this, PopupUserMenu);

    _this = _super.call(this, 'div', props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    if (PopupUserMenu._instance) {
      return _possibleConstructorReturn(_this, PopupUserMenu._instance);
    }

    PopupUserMenu._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(PopupUserMenu, [{
    key: "addEvents",
    value: function addEvents() {
      var popup = this._element;

      if (popup) {
        popup.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
        var addUserBtn = popup.querySelector('#menu-add-user-btn');
        var deleteUserBtn = popup.querySelector('#menu-delete-user-btn');
        addUserBtn === null || addUserBtn === void 0 ? void 0 : addUserBtn.addEventListener('click', this.handleClick);
        deleteUserBtn === null || deleteUserBtn === void 0 ? void 0 : deleteUserBtn.addEventListener('click', this.handleClick);
      }

      return true;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.id === 'menu-add-user-btn') {
        store.dispatch({
          type: _Store.Actions.USER_MENU_POPUP_SHOW,
          data: {
            showPopup: false
          }
        });
        store.dispatch({
          type: _Store.Actions.ADD_USER_POPUP_SHOW,
          data: {
            showPopup: true
          }
        });
      }

      if (event.target.id === 'menu-delete-user-btn') {
        store.dispatch({
          type: _Store.Actions.USER_MENU_POPUP_SHOW,
          data: {
            showPopup: false
          }
        });
        store.dispatch({
          type: _Store.Actions.DELETE_USER_FROM_CHAT,
          data: {
            showPopup: true
          }
        });
      }
    }
  }, {
    key: "outsideClick",
    value: function outsideClick(event) {
      var popup = PopupUserMenu._instance._element;

      if (event.type === 'click') {
        if (popup) {
          if (popup === event.target) {
            popup.style.display = 'none';
            popup.removeEventListener('click', this.outsideClick);
            store.dispatch({
              type: _Store.Actions.USER_MENU_POPUP_SHOW,
              data: {
                showPopup: false
              }
            });
          }
        }
      }

      if (event.key === 'Escape') {
        if (popup) {
          popup.style.display = 'none';
          document.removeEventListener('keydown', this.outsideClick);
          store.dispatch({
            type: _Store.Actions.USER_MENU_POPUP_SHOW,
            data: {
              showPopup: false
            }
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var compiled = (0, _pug.compile)(_template.tmplUserMenu);
      var html = compiled(this.props);
      return html;
    }
  }]);

  return PopupUserMenu;
}(_Block2.Block);

exports.PopupUserMenu = PopupUserMenu;

_defineProperty(PopupUserMenu, "_instance", void 0);