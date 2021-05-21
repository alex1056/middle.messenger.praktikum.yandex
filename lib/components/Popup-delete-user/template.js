"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplDeleteAddUser = void 0;
var tmplDeleteAddUser = "\ndiv(class=\"popup popup_visible\" id=\"delete-user-popup\")\n    div(class=\"popup__body\")\n        form(class=\"delete-user\" id=\"delete-user-form\")\n            div(class=\"popup__text-cont\")\n                p(class=\"popup__exclam\") \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0438\u0437 \u0447\u0430\u0442\u0430?\n                div(class=\"popup__fset delete-user__fset\")\n                    label(for=\"userlogin-delete-user-form\" id=\"labeluserlogin-delete-user-form\" class=\"popup__label\") \u041B\u043E\u0433\u0438\u043D\n                    input(type=\"text\" id=\"userlogin-delete-user-form\" class=\"popup__input\" value=\"\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 email\")/\n                div(class=\"add-user-popup__err-message\")    \n                    span(id=\"erroruserlogin-delete-user-form\")\n            div(class=\"popup__btn-cont\")\n                != buttonCancel\n                != buttonAdd";
exports.tmplDeleteAddUser = tmplDeleteAddUser;