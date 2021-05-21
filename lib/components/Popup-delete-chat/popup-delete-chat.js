"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupDeleteChat = void 0;

var _pug = require("pug");

var _Block2 = require("../Block");

var _Button = require("../Button");

var _template = require("./template");

var _Store = require("../../modules/Store");

var _Api = require("../../modules/Api");

var _transfromChatsData = require("../../utils/transfrom-chats-data");

require("./style.scss");

var _Router = require("../../modules/Router");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var api = new _Api.Api();
var router = new _Router.Router('.page');

var PopupDeleteChat = /*#__PURE__*/function (_Block) {
  _inherits(PopupDeleteChat, _Block);

  var _super = _createSuper(PopupDeleteChat);

  function PopupDeleteChat(props) {
    var _this;

    _classCallCheck(this, PopupDeleteChat);

    _this = _super.call(this, 'div', _objectSpread(_objectSpread({}, props), {}, {
      buttonCancel: new _Button.Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        buttonId: 'cancel-delete-chat-btn',
        type: 'button' // disabled: true,

      }),
      buttonAdd: new _Button.Btn({
        buttonText: 'Удалить',
        className: 'popup__btn btn_small',
        buttonId: 'submit-delete-chat-btn',
        disabled: false,
        type: 'submit'
      })
    }));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    if (PopupDeleteChat._instance) {
      return _possibleConstructorReturn(_this, PopupDeleteChat._instance);
    }

    PopupDeleteChat._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(PopupDeleteChat, [{
    key: "addEvents",
    value: function addEvents() {
      var popup = this._element;

      if (popup) {
        popup.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
        var form = popup.querySelector('#delete-chat-form');
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', this.onSubmit);
      }

      return true;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      var chatId = PopupDeleteChat._instance.props.chatId;

      var _store$getState = store.getState(),
          activeChatId = _store$getState.activeChatId;

      var activeChatIdLocal;

      if (Number(chatId) === Number(activeChatId)) {
        activeChatIdLocal = null;
      } else {
        activeChatIdLocal = activeChatId;
      }

      api.deleteChat(chatId).then(function (res) {
        if (res.ok) {
          api.getChats().then(function (res1) {
            var chatsDataReply = res1.json();
            var chatsDataChanged = (0, _transfromChatsData.transfromChatsData)(chatsDataReply);
            store.dispatch({
              type: _Store.Actions.SET_ACTIVE_CHAT,
              data: {
                activeChatId: activeChatIdLocal
              }
            });
            store.dispatch({
              type: _Store.Actions.CHATS_UPDATE,
              data: chatsDataChanged
            });

            if (Number(chatId) === Number(activeChatId)) {
              router.go({}, '/');
            }
          }); // const avatarUrl = `${urlApiResources}${userDataFromServer.avatar}`;
          // ProfileForm._instance.setProps({
          //   ...ProfileForm._instance.props,
          //   data: { ...userDataFromServer, avatar: avatarUrl },
          // });
        } else {
          console.log(res.json());
        }
      });
    }
  }, {
    key: "outsideClick",
    value: function outsideClick(event) {
      var popup = PopupDeleteChat._instance._element;

      if (event.key === 'Escape') {
        if (popup) {
          popup.style.display = 'none';
          document.removeEventListener('keydown', this.outsideClick);
          store.dispatch({
            type: _Store.Actions.DELETE_CHAT_POPUP_SHOW,
            data: {
              showPopup: false
            }
          });
        }
      }

      if (event.type === 'click') {
        if (popup) {
          if (popup === event.target || event.target.id === 'delete-user-cancel-btn' || event.target.classList.contains('btn__text')) {
            store.dispatch({
              type: _Store.Actions.DELETE_CHAT_POPUP_SHOW,
              data: {
                showPopup: false
              }
            });
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var compiled = (0, _pug.compile)(_template.tmplDeleteChat);
      var html = compiled(_objectSpread(_objectSpread({}, this.props), {}, {
        buttonCancel: this.props.buttonCancel.render(),
        buttonAdd: this.props.buttonAdd.render()
      }));
      return html;
    }
  }]);

  return PopupDeleteChat;
}(_Block2.Block);

exports.PopupDeleteChat = PopupDeleteChat;

_defineProperty(PopupDeleteChat, "_instance", void 0);