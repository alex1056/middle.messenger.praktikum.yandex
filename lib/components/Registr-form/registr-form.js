"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegistrForm = void 0;

var _pug = require("pug");

var _Router = require("../../modules/Router");

var _Block2 = require("../Block");

var _Button = require("../Button");

var _template = require("./template");

var _form = require("../../modules/form");

var _validator = require("../../modules/validator");

require("./style.scss");

var _onSubmitHandlers = require("../../modules/form/onSubmitHandlers");

var _Api = require("../../modules/Api");

var _Store = require("../../modules/Store");

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

var api = new _Api.Api();
var store = (0, _Store.createStore)();
var router = new _Router.Router('.page');

var RegistrForm = /*#__PURE__*/function (_Block) {
  _inherits(RegistrForm, _Block);

  var _super = _createSuper(RegistrForm);

  function RegistrForm(props) {
    var _this;

    _classCallCheck(this, RegistrForm);

    _this = _super.call(this, 'div', {
      buttonsubmit: new _Button.Btn(_objectSpread(_objectSpread({}, props), {}, {
        buttonText: 'Зарегистрироваться',
        className: 'btn_disabled',
        buttonId: 'submit-form-registr',
        disabled: true
      }))
    });

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "form", void 0);

    return _this;
  }

  _createClass(RegistrForm, [{
    key: "onSubmitHandlerLogin",
    value: function onSubmitHandlerLogin(event, form, formId) {
      event.preventDefault();
      var errServerReply = document.body.querySelector("#".concat(formId));
      var errSpan = errServerReply.querySelector('#error-server-reply');
      var inputsData = (0, _onSubmitHandlers.onSubmitGetFormData)(form, formId);
      var inputsDataMapped = (0, _onSubmitHandlers.mapInputsForSending)(inputsData, formId);
      api.logOut().then(function () {
        store.dispatch({
          type: _Store.Actions.LOGOUT_CLEAN_DATA,
          data: {}
        });
        api.signUp({
          data: inputsDataMapped
        }).then(function (res) {
          if (res.ok) {
            api.getUserData().then(function (res1) {
              var userData = res1.json();
              store.dispatch({
                type: _Store.Actions.GET_USER_DATA,
                data: userData
              });

              if (errSpan) {
                errSpan.textContent = '';
              }

              window.location.href = '/';
            });
          } else if (errSpan) {
            errSpan.textContent = res.errorMessageText;
          }
        });
      });
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      this.form = new _form.Form('form-registr');
      this.form.setPopup(this._element);
      this.form.setHandlers('submit', this.onSubmitHandlerLogin);
      this.form.setEventListeners();
      var currentForm = null;
      var formValidator = null;

      if (this._element) {
        currentForm = this._element.querySelector('#form-registr');
      }

      if (currentForm) {
        formValidator = new _validator.Validator(currentForm, 'form-registr');
      }

      if (formValidator) {
        formValidator.setHandleLabels(true);
      }

      this.form.setFormValidator(formValidator);

      if (this._element) {
        var loginBtnRedirect = this._element.querySelector('#registr-btn-redirect-login-form');

        if (loginBtnRedirect) {
          loginBtnRedirect.addEventListener('click', this.goLoginForm);
        }
      }

      return true;
    }
  }, {
    key: "goLoginForm",
    value: function goLoginForm() {
      router.go({
        redirect: true
      }, '', '/login');
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.form) {
        this.form.removeEventListeners();
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var compiled = (0, _pug.compile)(_template.tmplRegistr);
      var html = compiled({
        buttonsubmit: this.props.buttonsubmit.render()
      });
      return html;
    }
  }]);

  return RegistrForm;
}(_Block2.Block);

exports.RegistrForm = RegistrForm;