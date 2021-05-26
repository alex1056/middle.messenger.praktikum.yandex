"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventBus = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    _defineProperty(this, "listeners", void 0);

    this.listeners = {};
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event] = this.listeners[event].filter(function (listener) {
        return listener !== callback;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event].forEach(function (listener) {
        listener.apply(void 0, args);
      });
    }
  }]);

  return EventBus;
}();

exports.EventBus = EventBus;

_defineProperty(EventBus, "_instance", {});