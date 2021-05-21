"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileForm = void 0;

var _pug = require("pug");

var _form = require("../../modules/form");

var _validator = require("../../modules/validator");

var _Block2 = require("../Block");

var _Button = require("../Button");

var _ProfileFormCtrls = require("../Profile-form-ctrls");

var _template = require("./template");

require("./style.scss");

var _onSubmitHandlers = require("../../modules/form/onSubmitHandlers");

var _Api = require("../../modules/Api");

var _Store = require("../../modules/Store");

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

var api = new _Api.Api();
var store = (0, _Store.createStore)();
var router = new _Router.Router('.page');

var ProfileForm = /*#__PURE__*/function (_Block) {
  _inherits(ProfileForm, _Block);

  var _super = _createSuper(ProfileForm);

  function ProfileForm(props) {
    var _this;

    _classCallCheck(this, ProfileForm);

    _this = _super.call(this, 'div', _objectSpread(_objectSpread({}, props), {}, {
      buttonsubmit: new _Button.Btn(_objectSpread(_objectSpread({}, props), {}, {
        buttonText: 'Сохранить',
        className: 'pform__btn-save btn_hide',
        disabled: true
      })),
      ctrls: new _ProfileFormCtrls.ProfileFormCtrls(_objectSpread({}, props)),
      inputsDisabled: true,
      showPasswordFields: false,
      data: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        avatar: ''
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "form", void 0);

    _defineProperty(_assertThisInitialized(_this), "popupChngAvatar", void 0);

    var _ref = props,
        rootQuery = _ref.rootQuery;

    if (ProfileForm._instance) {
      return _possibleConstructorReturn(_this, ProfileForm._instance);
    }

    _this.rootQuery = rootQuery;
    _this.setProps = _this.setProps.bind(_assertThisInitialized(_this));
    _this.chngData = _this.chngData.bind(_assertThisInitialized(_this));
    _this.chngPwd = _this.chngPwd.bind(_assertThisInitialized(_this));
    ProfileForm._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(ProfileForm, [{
    key: "chngData",
    value: function chngData() {
      ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
        className: 'pform__btn-save',
        ctrlsContainer: 'pform__ctrls-container_hide',
        inputsDisabled: false,
        setListeners: true
      }));
    }
  }, {
    key: "chngPwd",
    value: function chngPwd() {
      ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
        className: 'pform__btn-save',
        ctrlsContainer: 'pform__ctrls-container_hide',
        inputsDisabled: false,
        setListeners: true,
        showPasswordFields: true
      }));
    }
  }, {
    key: "chngAvatar",
    value: function chngAvatar() {
      var _ProfileForm$_instanc;

      var inputsDisabled = (_ProfileForm$_instanc = ProfileForm._instance.props) === null || _ProfileForm$_instanc === void 0 ? void 0 : _ProfileForm$_instanc.inputsDisabled;

      ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
        inputsDisabled: inputsDisabled,
        setListeners: true,
        setListenersChngAvatar: true
      }));

      store.dispatch({
        type: _Store.Actions.CHNG_AVATAR_POPUP_SHOW,
        data: {
          showPopup: true
        }
      });
    }
  }, {
    key: "onSubmitHandlerProfile",
    value: function onSubmitHandlerProfile(event, form, formId) {
      event.preventDefault();
      var errServerReply = document.body.querySelector("#".concat(formId));
      var errSpan = errServerReply.querySelector('#error-server-reply');
      var inputsData = (0, _onSubmitHandlers.onSubmitGetFormData)(form, formId);
      var inputsDataMapped = (0, _onSubmitHandlers.mapInputsForSending)(inputsData, formId);

      var _store$getState = store.getState(),
          userData = _store$getState.userData;

      if (userData.id) {
        var _ref2 = inputsDataMapped,
            oldPassword = _ref2.oldPassword,
            newPassword = _ref2.newPassword;

        if (oldPassword && newPassword) {
          api.chngUserPassword({
            data: inputsDataMapped
          }).then(function (res) {
            if (res.ok) {
              if (errSpan) {
                errSpan.textContent = 'Изменения сохранены';
              }

              setTimeout(function () {
                ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                  buttonsubmit: new _Button.Btn(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                    buttonText: 'Сохранить',
                    className: 'pform__btn-save btn_hide',
                    disabled: true
                  })),
                  ctrlsContainer: 'pform__ctrls-container',
                  inputsDisabled: false,
                  setListeners: true,
                  showPasswordFields: false,
                  ctrls: new _ProfileFormCtrls.ProfileFormCtrls(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                    ctrlsContainer: 'pform__ctrls-container'
                  }))
                }));
              }, 1000);
            } else if (errSpan) {
              var _res$json = res.json(),
                  reason = _res$json.reason;

              errSpan.textContent = reason;
            }
          });
        } else {
          api.chngUserProfileData({
            data: inputsDataMapped
          }).then(function (res) {
            if (res.ok) {
              var userDataFromServer = res.json();

              if (errSpan) {
                errSpan.textContent = 'Изменения сохранены';
              }

              store.dispatch({
                type: _Store.Actions.GET_USER_DATA,
                data: userDataFromServer
              });
              setTimeout(function () {
                var avatarUrl = "".concat(_Api.urlApiResources).concat(userDataFromServer.avatar);

                ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                  data: _objectSpread(_objectSpread({}, userDataFromServer), {}, {
                    avatar: avatarUrl
                  }),
                  buttonsubmit: new _Button.Btn(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                    buttonText: 'Сохранить',
                    className: 'pform__btn-save btn_hide',
                    disabled: true
                  })),
                  ctrlsContainer: 'pform__ctrls-container',
                  inputsDisabled: false,
                  setListeners: true,
                  showPasswordFields: false,
                  ctrls: new _ProfileFormCtrls.ProfileFormCtrls(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
                    ctrlsContainer: 'pform__ctrls-container'
                  }))
                }));
              }, 1000);
            } else if (errSpan) {
              var _res$json2 = res.json(),
                  reason = _res$json2.reason;

              errSpan.textContent = reason;
            }
          });
        }
      }
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _ref3 = this.props,
          setListeners = _ref3.setListeners;
      var nodeData = null;
      var nodePwd = null;
      var nodeChngAvatar = null;

      if (this._element) {
        nodeData = this._element.querySelector('#chng-data-btn-form-profile');
        nodePwd = this._element.querySelector('#chng-pwd-btn-form-profile');
        nodeChngAvatar = this._element.querySelector('#chng-avatar-btn-form-profile');
      }

      if (nodeData && nodePwd && nodeChngAvatar) {
        nodeData.addEventListener('click', this.chngData);
        nodePwd.addEventListener('click', this.chngPwd);
        nodeChngAvatar.addEventListener('click', this.chngAvatar);
      }

      if (setListeners) {
        this.form = new _form.Form('form-profile');
        this.form.setPopup(this._element);
        this.form.setHandlers('submit', this.onSubmitHandlerProfile);
        this.form.setEventListeners();
        var currentForm = null;
        var formValidator = null;

        if (this._element) {
          currentForm = this._element.querySelector('#form-profile');
        }

        if (currentForm) {
          formValidator = new _validator.Validator(currentForm, 'form-profile');
        }

        if (formValidator) {
          formValidator.setHandleLabels(false);
        }

        this.form.setFormValidator(formValidator);
      }

      var profileBtnBack = null;

      if (this._element) {
        profileBtnBack = this._element.querySelector('#profile-btn-back');
      }

      if (profileBtnBack) {
        profileBtnBack.addEventListener('click', this.goBack);
      }

      var profileBtnLogout = null;

      if (this._element) {
        profileBtnLogout = this._element.querySelector('#profile-btn-logout');
      }

      if (profileBtnLogout) {
        profileBtnLogout.addEventListener('click', this.goLogout);
      }

      return true;
    }
  }, {
    key: "goBack",
    value: function goBack() {
      router.back();
    }
  }, {
    key: "goLogout",
    value: function goLogout() {
      api.logOut().then(function () {
        store.dispatch({
          type: _Store.Actions.LOGOUT_CLEAN_DATA,
          data: {}
        });
        router.go({}, '/login');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      api.getUserData().then(function (res) {
        if (res.ok) {
          var userDataFromServer = res.json();
          store.dispatch({
            type: _Store.Actions.GET_USER_DATA,
            data: userDataFromServer
          }); // console.log('До setProps: ProfileForm._instance.props', { ...ProfileForm._instance.props });
          // console.log('До setProps: userDataFromServer', userDataFromServer);

          var avatarUrl = "".concat(_Api.urlApiResources).concat(userDataFromServer.avatar);

          ProfileForm._instance.setProps(_objectSpread(_objectSpread({}, ProfileForm._instance.props), {}, {
            data: _objectSpread(_objectSpread({}, userDataFromServer), {}, {
              avatar: avatarUrl
            })
          })); // console.log('После setProps: ProfileForm._instance.props', { ...ProfileForm._instance.props });

        }
      });
      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.form) {
        this.form.removeEventListeners();
      }

      var _ref4 = this.props,
          ctrlsContainer = _ref4.ctrlsContainer;

      if (ctrlsContainer === 'pform__ctrls-container_hide') {
        if (this.props) {
          this.props.buttonsubmit = new _Button.Btn(_objectSpread(_objectSpread({}, this.props), {}, {
            buttonText: 'Сохранить',
            className: 'pform__btn-save',
            buttonId: 'submit-form-profile',
            disabled: false
          }));
        }

        if (this.props) {
          this.props.ctrls = new _ProfileFormCtrls.ProfileFormCtrls(this.props);
        }
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var compiled = (0, _pug.compile)(_template.tmplProfile);
      var html = compiled(_objectSpread(_objectSpread({}, this.props), {}, {
        buttonsubmit: this.props ? this.props.buttonsubmit.render() : '',
        ctrls: this.props ? this.props.ctrls.render() : ''
      }));
      return html;
    }
  }]);

  return ProfileForm;
}(_Block2.Block);

exports.ProfileForm = ProfileForm;

_defineProperty(ProfileForm, "_instance", void 0);