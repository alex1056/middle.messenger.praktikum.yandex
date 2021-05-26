"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplPopupAddUser = void 0;
var tmplPopupAddUser = "\ndiv(class=\"popup popup_visible\" id=\"add-user-popup\")\n    div(class=\"popup__body\")\n        form(id=\"popup-add-user-form\")\n            div(class=\"popup__text-cont\")\n                p(class=\"popup__action-title\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\n                div(class=\"popup__fset\")\n                    label(for=\"userlogin-popup-add-user-form\" id=\"labeluserlogin-popup-add-user-form\" class=\"popup__label\") \u041B\u043E\u0433\u0438\u043D\n                    input(type=\"text\" id=\"userlogin-popup-add-user-form\" class=\"popup__input\" value=\"\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D\")/\n                div(class=\"add-user-popup__err-message\")    \n                    span(id=\"erroruserlogin-popup-add-user-form\")\n            div(class=\"popup__btn-cont add-user-popup__btn-cont\")\n                != buttonCancel\n                != buttonAdd";
exports.tmplPopupAddUser = tmplPopupAddUser;