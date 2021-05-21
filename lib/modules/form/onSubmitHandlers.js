"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSubmitGetFormData = onSubmitGetFormData;
exports.mapInputsForSending = mapInputsForSending;
exports.onSubmitTestLogin = onSubmitTestLogin;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { sanitizeHtmlXss } from '../../utils/sanitizeHtml';
function onSubmitGetFormData(form, formId) {
  if (!formId) {
    throw new Error('Не задан formId для кнопки Submit!');
  }

  var inputs = Array.from(form.elements);
  var submit = form.querySelector("#submit-".concat(formId));
  var cancel = form.querySelector("#cancel-".concat(formId));
  var inputsData = inputs.reduce(function (acc, _ref) {
    var id = _ref.id,
        value = _ref.value;

    if (cancel) {
      if (id && id !== submit.id && id !== cancel.id) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, id, value));
      }
    } else if (id && id !== submit.id) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, id, value));
    }

    return acc;
  }, {});
  return inputsData;
}

function mapInputsForSending(inputsData, formId) {
  if (inputsData) {
    return Object.keys(inputsData).reduce(function (acc, item) {
      switch (item) {
        case "email-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            email: inputsData[item]
          });

        case "login-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            login: inputsData[item]
          });

        case "name-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            first_name: inputsData[item]
          });

        case "surname-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            second_name: inputsData[item]
          });

        case "phone-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            phone: inputsData[item]
          });

        case "password-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            password: inputsData[item]
          });

        case "nick-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            display_name: inputsData[item]
          });

        case "avatar-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            avatar: inputsData[item]
          });

        case "oldPassword-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            oldPassword: inputsData[item]
          });

        case "newpassword-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            newPassword: inputsData[item]
          });

        case "newchat-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            chatName: inputsData[item]
          });

        case "userlogin-".concat(formId):
          return _objectSpread(_objectSpread({}, acc), {}, {
            userLogin: inputsData[item]
          });

        default:
          return acc;
      }
    }, {});
  }

  throw new Error('Отсутствуют данные из формы для отправки на сервер!');
} // export function mapInputsForSending(inputsData: any, formId: string) {
//   if (inputsData) {
//     return Object.keys(inputsData).reduce((acc, item) => {
//       switch (item) {
//         case `email-${formId}`:
//           return { ...acc, email: sanitizeHtmlXss(inputsData[item]) };
//         case `login-${formId}`:
//           return { ...acc, login: sanitizeHtmlXss(inputsData[item]) };
//         case `name-${formId}`:
//           return { ...acc, first_name: sanitizeHtmlXss(inputsData[item]) };
//         case `surname-${formId}`:
//           return { ...acc, second_name: sanitizeHtmlXss(inputsData[item]) };
//         case `phone-${formId}`:
//           return { ...acc, phone: sanitizeHtmlXss(inputsData[item]) };
//         case `password-${formId}`:
//           return { ...acc, password: sanitizeHtmlXss(inputsData[item]) };
//         case `nick-${formId}`:
//           return { ...acc, display_name: sanitizeHtmlXss(inputsData[item]) };
//         case `avatar-${formId}`:
//           return { ...acc, avatar: sanitizeHtmlXss(inputsData[item]) };
//         case `oldPassword-${formId}`:
//           return { ...acc, oldPassword: sanitizeHtmlXss(inputsData[item]) };
//         case `newpassword-${formId}`:
//           return { ...acc, newPassword: sanitizeHtmlXss(inputsData[item]) };
//         default:
//           return acc;
//       }
//     }, {});
//   }
//   throw new Error('Отсутствуют данные из формы для отправки на сервер!');
// }


function onSubmitTestLogin() {
  console.log('onSubmitTestLogin');
}