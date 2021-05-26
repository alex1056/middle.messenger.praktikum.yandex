"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sanitizeHtml = require("../../utils/sanitizeHtml");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = /*#__PURE__*/function () {
  function Form(formId) {
    _classCallCheck(this, Form);

    _defineProperty(this, "validateForm", void 0);

    _defineProperty(this, "handlerFormOpen", void 0);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "submit", void 0);

    _defineProperty(this, "popup", void 0);

    _defineProperty(this, "validateInputElement", void 0);

    _defineProperty(this, "handlers", void 0);

    _defineProperty(this, "formId", void 0);

    this.handlers = {};

    if (!formId) {
      throw new Error('Не задан formId для валидации!');
    }

    this.formId = formId;
  }

  _createClass(Form, [{
    key: "setFormValidator",
    value: function setFormValidator(validator) {
      this.validateForm = validator.validateForm.bind(validator);
      this.validateInputElement = validator.validateInputElement.bind(validator);
    }
  }, {
    key: "setHandlers",
    value: function setHandlers(handlerName, callback) {
      if (!this.handlers[handlerName]) {
        this.handlers[handlerName] = [];
      }

      this.handlers[handlerName].push(callback);
    }
  }, {
    key: "setPopup",
    value: function setPopup(popupElem) {
      this.popup = popupElem;
      this.form = popupElem.querySelector("#".concat(this.formId));
      this.submit = popupElem.querySelector("#".concat(this.formId, " #submit-").concat(this.formId));
    }
  }, {
    key: "getForm",
    value: function getForm() {
      if (this.form) {
        return this.form;
      }

      return null;
    }
  }, {
    key: "getSubmitBtn",
    value: function getSubmitBtn() {
      if (this.submit) {
        return this.submit;
      }

      return null;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this.handlerFormOpen = this.formHandler.bind(this);
      var form = this.popup.querySelector("#".concat(this.formId));

      if (form) {
        var inputs = Array.from(form.elements);
        inputs.forEach(function (elem) {
          if (elem.id !== "submit-".concat(_this.formId)) {
            elem.addEventListener('focus', _this.handlerFormOpen // eslint-disable-line no-undef
            //  true
            );
            elem.addEventListener('blur', _this.handlerFormOpen // eslint-disable-line no-undef
            //  true
            );
          }
        });
        form.addEventListener('submit', this.handlerFormOpen // eslint-disable-line no-undef
        // true
        );
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var _this2 = this;

      var form = this.popup.querySelector("#".concat(this.formId));

      if (form) {
        var inputs = Array.from(form.elements);
        inputs.forEach(function (elem) {
          elem.removeEventListener('focus', _this2.handlerFormOpen); // eslint-disable-line no-undef

          elem.removeEventListener('blur', _this2.handlerFormOpen); // eslint-disable-line no-undef
        });
        form.removeEventListener('submit', this.handlerFormOpen); // eslint-disable-line no-undef
      }
    }
  }, {
    key: "renderButton",
    value: function renderButton(isValidForm) {
      if (!isValidForm) {
        this.submit.classList.add('btn_disabled');
        this.submit.setAttribute('disabled', 'disabled');
      } else {
        this.submit.classList.remove('btn_disabled');
        this.submit.removeAttribute('disabled');
      }
    }
  }, {
    key: "formHandler",
    value: function formHandler(event) {
      var _this3 = this;

      var isValidForm = this.validateForm(event);
      this.renderButton(isValidForm);

      if (event.type === 'submit') {
        if (this.handlers.submit) {
          this.handlers.submit.forEach(function (callback) {
            callback(event, _this3.form, _this3.formId);
          });
        }
      }
    }
  }, {
    key: "getFormData",
    value: function getFormData() {
      var inputs = Array.from(this.form.elements);
      var submit = this.form.querySelector("#".concat(this.formId));
      var inputsData = inputs.reduce(function (acc, item) {
        var id = item.id,
            value = item.value;

        if (id && id !== submit.id) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, id, (0, _sanitizeHtml.sanitize)(value)));
        }

        return acc;
      }, {});
      return inputsData;
    }
  }]);

  return Form;
}();

exports["default"] = Form;