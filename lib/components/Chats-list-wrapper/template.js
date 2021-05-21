"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplChatList = void 0;
var tmplChatList = "\ndiv(class=\"chats-list\")\n    div(class=\"chats-list__wrapper\")\n        div(class=\"chats-list__top-buttons\")\n            a(class=\"btn-new-chat\" id=\"btn-new-chat\")    \u041D\u043E\u0432\u044B\u0439 \u0447\u0430\u0442\n            a(class=\"btn-profile\" id=\"btn-go-profile\")    \u041F\u0440\u043E\u0444\u0438\u043B\u044C\n        div(class=\"input\")\n            input(type=\"text\" class=\"input-element\")/\n            div(class=\"input__wrapper\")\n                div(class=\"input__wrapper-loop\")\n                    span(class=\"input__loop-text\")  \u041F\u043E\u0438\u0441\u043A\n        != chatList";
exports.tmplChatList = tmplChatList;