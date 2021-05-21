"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btnTmpl = void 0;
var btnTmpl = "button(type= type ? type : \"submit\" id= buttonId disabled= disabled ? '' : null class=\"btn\" class=className)\n        span(class=\"btn__text\") #{buttonText}";
exports.btnTmpl = btnTmpl;