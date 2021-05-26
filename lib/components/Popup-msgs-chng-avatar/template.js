"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplPopupChngAvatar = void 0;
var tmplPopupChngAvatar = "\ndiv(class=\"popup popup_visible\" id=\"msgs-chng-avatar-popup\")\n    div(class=\"popup__body\")\n        form(class=\"popup__text-cont\" id=\"form-msgs-chng-avatar\")\n            p(class=\"popup__action-title\") \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\n            p(class=\"form-chng-avatar__uploaded-file\" id=\"uploadedfile-form-msgs-chng-avatar\")\n            label(for=\"uploadInput-form-msgs-chng-avatar\" class=\"popup__description\" id=\"labelavatar-form-msgs-chng-avatar\") \u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B \u043D\u0430 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0435\n            input(id=\"uploadInput-form-msgs-chng-avatar\" type=\"file\" class=\"form-chng-avatar__input\" name=\"avatar\" accept=\"image/*\")/\n            div(class=\"form-msgs-chng-avatar__err-message-server-reply\")\n                        span(id=\"erroravatar-form-msgs-chng-avatar\")\n            != buttonChange";
exports.tmplPopupChngAvatar = tmplPopupChngAvatar;