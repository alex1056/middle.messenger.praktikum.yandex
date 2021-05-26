"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplDeleteChat = void 0;
var tmplDeleteChat = "\ndiv(class=\"popup popup_visible\" id=\"delete-chat-popup\")\n    div(class=\"popup__body\")\n        form(class=\"delete-chat-form\" id=\"delete-chat-form\")\n            p(class=\"popup__exclam\") \u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442 \u0438 \u0432\u0441\u044E \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0443?\n            p(class=\"popup__item-to-delete delete-chat-form__chat-name\") \u0427\u0430\u0442:\n                span(class=\"popup__item-to-delete\") &nbsp; #{chatName}\n            div(class=\"popup__btn-cont\")\n                != buttonCancel\n                != buttonAdd";
exports.tmplDeleteChat = tmplDeleteChat;