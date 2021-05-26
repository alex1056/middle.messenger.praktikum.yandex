"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupChngAvatar = void 0;

var _pug = require("pug");

var _Block2 = require("../Block");

var _Button = require("../Button");

var _template = require("./template");

var _Api = require("../../modules/Api");

var _Store = require("../../modules/Store");

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

var api = new _Api.Api();
var store = (0, _Store.createStore)();

var PopupChngAvatar = /*#__PURE__*/function (_Block) {
  _inherits(PopupChngAvatar, _Block);

  var _super = _createSuper(PopupChngAvatar);

  function PopupChngAvatar(props) {
    var _this;

    _classCallCheck(this, PopupChngAvatar);

    _this = _super.call(this, 'div', _objectSpread(_objectSpread({}, props), {}, {
      buttonChange: new _Button.Btn({
        buttonText: 'Поменять',
        buttonId: 'submit-form-chng-avatar',
        className: 'chng-avatar-popup__btn-submit btn_disabled',
        disabled: true
      })
    }));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "form", void 0);

    _defineProperty(_assertThisInitialized(_this), "files", void 0);

    if (PopupChngAvatar._instance) {
      return _possibleConstructorReturn(_this, PopupChngAvatar._instance);
    }

    PopupChngAvatar._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(PopupChngAvatar, [{
    key: "addEvents",
    value: function addEvents() {
      var popup = this._element;

      if (popup) {
        popup.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
        var form = popup.querySelector('#form-chng-avatar');
        var uploadInput = form === null || form === void 0 ? void 0 : form.querySelector('#uploadInput-form-chng-avatar');
        uploadInput === null || uploadInput === void 0 ? void 0 : uploadInput.addEventListener('change', this.handleFileUpload);
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', this.handleFileSubmit);
      }

      return true;
    }
  }, {
    key: "handleFileSubmit",
    value: function handleFileSubmit(event) {
      event.preventDefault();
      var popup = document.body.querySelector('#chng-avatar-popup');
      var formNode = popup === null || popup === void 0 ? void 0 : popup.querySelector('#form-chng-avatar');

      if (formNode) {
        var formData = new FormData();
        var uploadInput = formNode === null || formNode === void 0 ? void 0 : formNode.querySelector('#uploadInput-form-chng-avatar'); // @ts-ignore: Object is possibly 'null'

        if (uploadInput) {
          var _uploadInput$files;

          var file = uploadInput === null || uploadInput === void 0 ? void 0 : (_uploadInput$files = uploadInput.files) === null || _uploadInput$files === void 0 ? void 0 : _uploadInput$files[0];
          formData.append('avatar', file, 'my-file-name');
          api.chngUserAvatar({
            form: formData
          }).then(function (res) {
            if (res.ok) {
              var userDataFromServer = res.json();
              store.dispatch({
                type: _Store.Actions.GET_USER_DATA,
                data: userDataFromServer
              });
              store.dispatch({
                type: _Store.Actions.UPDATE_USER_AVATAR
              });
              store.dispatch({
                type: _Store.Actions.CHNG_AVATAR_POPUP_SHOW,
                data: {
                  showPopup: false
                }
              });
            } else {
              console.log(res.errorMessageText);
            }
          });
        }
      }
    }
  }, {
    key: "handleFileUpload",
    value: function handleFileUpload(event) {
      event.preventDefault();
      var form = document.querySelector('#form-chng-avatar');
      var fileList = this.files;

      if (fileList[0]) {
        var fName = form === null || form === void 0 ? void 0 : form.querySelector('#uploadedfile-form-chng-avatar');
        var inputLabel = form === null || form === void 0 ? void 0 : form.querySelector('#labelavatar-form-chng-avatar');
        var submitBtn = form === null || form === void 0 ? void 0 : form.querySelector('#submit-form-chng-avatar');

        if (fName) {
          var slicedName = fileList[0].name.split('').slice(0, 20).join('');
          fName.textContent = "".concat(slicedName).concat(fileList[0].name.length > 20 ? '...' : '');
          fName.style.display = 'block';

          if (inputLabel) {
            inputLabel.style.display = 'none';
          }

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn_disabled');
          }
        }
      }
    }
  }, {
    key: "outsideClick",
    value: function outsideClick(event) {
      var popup = PopupChngAvatar._instance._element;

      if (event.type === 'click') {
        if (popup) {
          if (popup === event.target) {
            popup.classList.add('hidden');
            popup.removeEventListener('click', this.outsideClick);
            store.dispatch({
              type: _Store.Actions.CHNG_AVATAR_POPUP_SHOW,
              data: {
                showPopup: false
              }
            });
          }
        }
      }

      if (event.key === 'Escape') {
        if (popup) {
          popup.classList.add('hidden');
          document.removeEventListener('keydown', this.outsideClick);
          store.dispatch({
            type: _Store.Actions.CHNG_AVATAR_POPUP_SHOW,
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
      var compiled = (0, _pug.compile)(_template.tmplPopupChngAvatar);
      var html = compiled(_objectSpread(_objectSpread({}, this.props), {}, {
        buttonChange: this.props.buttonChange.render()
      }));
      return html;
    }
  }]);

  return PopupChngAvatar;
}(_Block2.Block);

exports.PopupChngAvatar = PopupChngAvatar;

_defineProperty(PopupChngAvatar, "_instance", void 0);