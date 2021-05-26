"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { Actions } from './actions';
// type StoreSubscription = any;
var Store = /*#__PURE__*/function () {
  function Store(reducer, initialState) {
    _classCallCheck(this, Store);

    this.reducer = reducer;
    this.initialState = initialState;

    _defineProperty(this, "state", {});

    _defineProperty(this, "subscribers", {});

    this.state = reducer(_objectSpread({}, this.initialState), {
      type: '__INIT__'
    });
    this.reducer = reducer;
  }

  _createClass(Store, [{
    key: "subscribe",
    value: function subscribe(action, callback) {
      if (!this.subscribers[action]) {
        this.subscribers[action] = [];
      }

      this.subscribers[action].push(callback);
      return {
        unsubscribe: function () {
          this.subscribers[action] = this.subscribers[action].filter(function (subscriber) {
            return subscriber !== callback;
          });
        }.bind(this)
      };
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      var _this = this;

      this.state = this.reducer(this.state, action);

      if (!this.subscribers[action.type]) {// console.log(`Нет события: ${action.type}`);
      } else {
        this.subscribers[action.type].forEach(function (subscriber) {
          return subscriber(_this.state);
        });
      }

      localStorage.setItem('app-state', JSON.stringify(this.state));
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);

  return Store;
}();

exports.Store = Store;

_defineProperty(Store, "_instance", {});