"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = void 0;

var sanitize = function sanitize(str) {
  return str.replace(/[&<>"']/gi, '');
};

exports.sanitize = sanitize;