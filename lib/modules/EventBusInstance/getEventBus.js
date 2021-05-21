"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventBus = getEventBus;

var _EventBus = require("../EventBus");

var _isEmpty = require("../../utils/is-empty");

function getEventBus() {
  if (!_EventBus.EventBus._instance || (0, _isEmpty.isEmpty)(_EventBus.EventBus._instance)) {
    _EventBus.EventBus._instance = new _EventBus.EventBus();
  }

  return _EventBus.EventBus._instance;
}