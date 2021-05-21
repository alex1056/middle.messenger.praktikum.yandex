"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeParce = void 0;

var timeParce = function timeParce(timeStr) {
  var msUTC = Date.parse(timeStr);
  var date = new Date(msUTC);
  var minutes = date.getMinutes() > 9 ? date.getMinutes() : "0".concat(date.getMinutes());
  return "".concat(date.getHours(), ": ").concat(minutes);
};

exports.timeParce = timeParce;