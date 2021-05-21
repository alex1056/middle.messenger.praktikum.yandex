"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplMsgs = void 0;
var tmplMsgs = "\ndiv(class=\"msgs\")\n    if chatId\n        div(class=\"msgs__container\")\n            div(class=\"msgs__head\")\n                div(class=\"msgs__avatar-nick-cont\")\n                    img(src=feed.imgSrc alt=\"\u0430\u0432\u0430\u0442\u0430\u0440\")\n                    span(class=\"msgs__nick-name-text\") #{feed.name}\n                div(class=\"msgs__add-remove-user\" id=\"add-remove-user\")    \n            != feedComponent\n            != sendForm\n    else\n        p(class=\"msgs__select-chat\") \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0442 \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435";
exports.tmplMsgs = tmplMsgs;