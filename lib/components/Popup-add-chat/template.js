"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplPopupAddChat = void 0;
var tmplPopupAddChat = "\ndiv(class=\"popup popup_visible\" id=\"add-chat-popup\")\n    div(class=\"popup__body\")\n        form(id=\"popup-add-chat-form\")\n            div(class=\"popup__text-cont\")\n                p(class=\"popup__action-title\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0447\u0430\u0442\n                div(class=\"popup__fset\")\n                    label(for=\"newchat-popup-add-chat-form\" class=\"popup__label\" id=\"labelnewchat-popup-add-chat-form\") \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\n                    input(type=\"text\" id=\"newchat-popup-add-chat-form\" class=\"popup__input\" value=\"\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0447\u0430\u0442\u0430\")/\n                div(class=\"add-chat-popup__err-message\")    \n                    span(id=\"errornewchat-popup-add-chat-form\")\n            div(class=\"popup__btn-cont add-chat-popup__btn-cont\")\n                != buttonCancel\n                != buttonAdd";
exports.tmplPopupAddChat = tmplPopupAddChat;