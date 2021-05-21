"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;

var _constants = require("./constants");

var _validateEmail = require("../../utils/validate-email");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validator = /*#__PURE__*/function () {
  function Validator(formEl) {
    var formId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Validator);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "inputs", void 0);

    _defineProperty(this, "handleLabels", void 0);

    _defineProperty(this, "submit", void 0);

    _defineProperty(this, "formId", void 0);

    this.form = formEl;

    if (!formId) {
      throw new Error('Не задан formId для валидации!');
    }

    this.formId = formId;
    this.handleLabels = false;

    if (this.form) {
      this.submit = this.form.querySelector("#".concat(this.formId, " #submit-").concat(this.formId));
      this.inputs = Array.from(this.form.elements);
    } else {
      throw new Error('Не найдена форма на странице');
    }
  }

  _createClass(Validator, [{
    key: "setHandleLabels",
    value: function setHandleLabels(handleLabels) {
      this.handleLabels = handleLabels;
    }
  }, {
    key: "finalCheck",
    value: function finalCheck() {
      var _this = this;

      var flag = true;
      this.inputs.forEach(function (elem) {
        if (elem.id && elem.id !== "submit-".concat(_this.formId) && elem.id !== "cancel-".concat(_this.formId)) {
          if (!_this.validateInputElement(elem)) {
            flag = false;
          }
        }
      });
      return flag;
    }
  }, {
    key: "validateForm",
    value: function validateForm(event) {
      var _this2 = this;

      event.preventDefault();
      var isValidForm = false;
      var flag = true;

      if (event.type === 'submit') {
        flag = this.finalCheck();

        if (!flag) {
          isValidForm = false;
          flag = true;
        } else {
          isValidForm = true;
        }
      } else {
        this.inputs.forEach(function (elem) {
          if (event.target.id === elem.id && event.target.id !== "submit-".concat(_this2.formId) && event.target.id !== "cancel-".concat(_this2.formId)) {
            if (!_this2.validateInputElement(elem)) {
              isValidForm = false;
            } else {
              flag = true;

              _this2.inputs.forEach(function (elem1) {
                if (elem1.id !== "submit-".concat(_this2.formId) && elem1.id !== "cancel-".concat(_this2.formId)) {
                  if (!elem1.value) {
                    flag = false;
                  }
                }
              });

              if (flag) {
                isValidForm = _this2.finalCheck();
              }
            }
          }
        });
      }

      return isValidForm;
    }
  }, {
    key: "validateInputElement",
    value: function validateInputElement(element) {
      var errorElement = document.querySelector("#".concat(this.formId, " #error").concat(element.id));

      if (!errorElement) {
        throw new Error('Отсутствуют поля для вывода информации о валидации');
      }

      if (this.handleLabels) {
        if (element.value.length) {
          var labelElement = document.querySelector("#".concat(this.formId, " #label").concat(element.id));

          if (!labelElement) {
            throw new Error('Отсутствуют label');
          } else {
            labelElement.classList.remove('login-form__label_hide');
          }
        } else {
          var _labelElement = document.querySelector("#".concat(this.formId, " #label").concat(element.id));

          if (!_labelElement) {
            throw new Error('Отсутствуют label');
          } else {
            _labelElement.classList.add('login-form__label_hide');
          }
        }
      }

      if (element.id === "passwordconfirm-".concat(this.formId)) {
        var pwdOld = document.querySelector("#".concat(this.formId, " #oldPassword-").concat(this.formId));
        var pwdNew = document.querySelector("#".concat(this.formId, " #newpassword-").concat(this.formId));
        var pwd = document.querySelector("#".concat(this.formId, " #password-").concat(this.formId));

        if (pwd && !pwdOld) {
          if (pwd.value !== element.value) {
            errorElement.textContent = _constants.validationTextErrors.pwdsDontMatch;
            return false;
          }
        }

        if (pwdNew && pwdOld) {
          if (pwdNew.value !== element.value) {
            errorElement.textContent = _constants.validationTextErrors.pwdsDontMatch;
            return false;
          }
        } else if (pwdOld) {
          if (pwdOld.value !== element.value) {
            errorElement.textContent = _constants.validationTextErrors.pwdsDontMatch;
            return false;
          }
        }
      }

      if (element.type !== 'email' && !element.value.length) {
        errorElement.textContent = _constants.validationTextErrors.validationLenght;
        return false;
      }

      if (element.type === 'email') {
        if (!(0, _validateEmail.validateEmail)(element.value)) {
          errorElement.textContent = _constants.validationTextErrors.validationEmailPresent;
          return false;
        }
      } else if (element.value.length < 2 || element.value.length > 30) {
        errorElement.textContent = _constants.validationTextErrors.validationLenght;
        return false;
      }

      errorElement.textContent = '';
      return true;
    }
  }]);

  return Validator;
}();

exports.Validator = Validator;