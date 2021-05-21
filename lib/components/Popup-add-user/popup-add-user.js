"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupAddUser = void 0;

var _pug = require("pug");

var _Block2 = require("../Block");

var _Button = require("../Button");

var _template = require("./template");

var _Store = require("../../modules/Store");

var _Api = require("../../modules/Api");

var _form = require("../../modules/form");

var _validator = require("../../modules/validator");

var _onSubmitHandlers = require("../../modules/form/onSubmitHandlers");

require("./style.scss");

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

var PopupAddUser = /*#__PURE__*/function (_Block) {
  _inherits(PopupAddUser, _Block);

  var _super = _createSuper(PopupAddUser);

  function PopupAddUser(props) {
    var _this;

    _classCallCheck(this, PopupAddUser);

    _this = _super.call(this, 'div', _objectSpread(_objectSpread({}, props), {}, {
      buttonCancel: new _Button.Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        type: 'button',
        buttonId: 'cancel-popup-add-user-form'
      }),
      buttonAdd: new _Button.Btn({
        buttonText: 'Добавить',
        className: 'popup__btn btn_small btn_disabled',
        disabled: true,
        type: 'submit',
        buttonId: 'submit-popup-add-user-form'
      })
    }));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "form", void 0);

    if (PopupAddUser._instance) {
      return _possibleConstructorReturn(_this, PopupAddUser._instance);
    }

    PopupAddUser._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(PopupAddUser, [{
    key: "addEvents",
    value: function addEvents() {
      var _this$_element;

      var popup = this._element;

      if (popup) {
        popup.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
      }

      this.form = new _form.Form('popup-add-user-form');
      this.form.setPopup(this._element);
      this.form.setHandlers('submit', this.onSubmitHandlerAddUser);
      this.form.setEventListeners();
      var currentForm = null;
      var formValidator = null;

      if (this._element) {
        currentForm = this._element.querySelector('#popup-add-user-form');
      }

      if (currentForm) {
        formValidator = new _validator.Validator(currentForm, 'popup-add-user-form');
      }

      if (formValidator) {
        formValidator.setHandleLabels(true);
      }

      this.form.setFormValidator(formValidator);
      var cancelBtn = (_this$_element = this._element) === null || _this$_element === void 0 ? void 0 : _this$_element.querySelector('#cancel-popup-add-user-form');
      cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', this.onCancelHandlerAddChat);
      return true;
    }
  }, {
    key: "onSubmitHandlerAddUser",
    value: function onSubmitHandlerAddUser(event, form, formId) {
      event.preventDefault();
      var inputsData = (0, _onSubmitHandlers.onSubmitGetFormData)(form, formId);
      var formData = (0, _onSubmitHandlers.mapInputsForSending)(inputsData, formId);
      var errSpan = document.querySelector('#add-user-popup #erroruserlogin-popup-add-user-form');
      api.findUser(formData.userLogin).then(function (res) {
        if (res.ok) {
          var resArr = res.json();
          var arrFiltered = resArr.filter(function (item) {
            if (item.login === formData.userLogin) {
              return true;
            }

            return false;
          }); // console.log(arrFiltered);

          if (arrFiltered.length === 0) {
            if (errSpan) {
              errSpan.textContent = 'пользователь не найден';
            }

            return;
          }

          var _ref = arrFiltered[0],
              id = _ref.id;

          if (id) {
            var users = [id];

            var _store$getState = store.getState(),
                activeChatId = _store$getState.activeChatId;

            api.addUsersToChat(users, activeChatId).then(function (res1) {
              if (res1.ok && errSpan) {
                errSpan.textContent = "".concat(formData.userLogin, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0447\u0430\u0442");
              }
            });
          } else {
            var _res$json = res.json(),
                reason = _res$json.reason;

            if (errSpan) {
              errSpan.textContent = "".concat(reason);
            }
          }
        }
      });
    }
  }, {
    key: "onCancelHandlerAddChat",
    value: function onCancelHandlerAddChat(event) {
      event.preventDefault();
      store.dispatch({
        type: _Store.Actions.ADD_USER_POPUP_SHOW,
        data: {
          showPopup: false
        }
      });
    }
  }, {
    key: "outsideClick",
    value: function outsideClick(event) {
      var popup = PopupAddUser._instance._element;

      if (event.type === 'click') {
        if (popup) {
          if (popup === event.target) {
            popup.style.display = 'none';
            popup.removeEventListener('click', this.outsideClick);
            store.dispatch({
              type: _Store.Actions.ADD_USER_POPUP_SHOW,
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
            type: _Store.Actions.ADD_USER_POPUP_SHOW,
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
      var compiled = (0, _pug.compile)(_template.tmplPopupAddUser);
      var html = compiled(_objectSpread(_objectSpread({}, this.props), {}, {
        buttonCancel: this.props.buttonCancel.render(),
        buttonAdd: this.props.buttonAdd.render()
      }));
      return html;
    }
  }]);

  return PopupAddUser;
}(_Block2.Block);

exports.PopupAddUser = PopupAddUser;

_defineProperty(PopupAddUser, "_instance", void 0);