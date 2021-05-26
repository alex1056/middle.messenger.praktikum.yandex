"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketRun = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var READY_STATE_STATUS; // const READY_STATE_STATUS_TEXT = ['0-CONNECTING', '1-OPEN', '2-CLOSING', '3-CLOSED'];

(function (READY_STATE_STATUS) {
  READY_STATE_STATUS[READY_STATE_STATUS["CONNECTING"] = 0] = "CONNECTING";
  READY_STATE_STATUS[READY_STATE_STATUS["OPEN"] = 1] = "OPEN";
  READY_STATE_STATUS[READY_STATE_STATUS["CLOSING"] = 2] = "CLOSING";
  READY_STATE_STATUS[READY_STATE_STATUS["CLOSED"] = 3] = "CLOSED";
})(READY_STATE_STATUS || (READY_STATE_STATUS = {}));

var WebSocketRun = /*#__PURE__*/function () {
  function WebSocketRun() {
    _classCallCheck(this, WebSocketRun);

    _defineProperty(this, "socket", void 0);

    _defineProperty(this, "subscribers", {});

    _defineProperty(this, "timerId", void 0);

    _defineProperty(this, "userId", void 0);

    _defineProperty(this, "chatId", void 0);

    _defineProperty(this, "token", void 0);

    if (WebSocketRun._instance) {
      return WebSocketRun._instance;
    }

    this.timerId = null;
    this.socketSend = this.socketSend.bind(this);
    WebSocketRun._instance = this;
  }

  _createClass(WebSocketRun, [{
    key: "socketInit",
    value: function socketInit(userId, chatId, token) {
      var _this = this;

      if (this.userId !== userId && this.chatId !== chatId && this.token !== token) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;

        if (!this.socket) {
          return new Promise(function (resolve) {
            _this.socket = new WebSocket("wss://ya-praktikum.tech/ws/chats/".concat(userId, "/").concat(chatId, "/").concat(token));

            _this.socket.addEventListener('open', function () {
              return resolve(_this.socket);
            });
          });
        }
      }

      if (this.socket) {
        if (WebSocketRun._instance.socket.readyState !== READY_STATE_STATUS.OPEN && WebSocketRun._instance.socket.readyState !== READY_STATE_STATUS.CONNECTING) {
          return new Promise(function (resolve) {
            _this.socket = new WebSocket("wss://ya-praktikum.tech/ws/chats/".concat(userId, "/").concat(chatId, "/").concat(token));

            _this.socket.addEventListener('open', function () {
              return resolve(_this.socket);
            });
          });
        }
      }

      return new Promise(function (resolve) {
        return resolve(WebSocketRun._instance.socket);
      });
    }
  }, {
    key: "socketPing",
    value: function socketPing() {
      var _this2 = this;

      this.timerId = setInterval(function () {
        _this2.socket.send(JSON.stringify({
          content: '',
          type: 'message'
        }));
      }, 10000);
    }
  }, {
    key: "socketStopPing",
    value: function socketStopPing() {
      if (this.timerId) {
        clearInterval(Number(this.timerId));
      }
    }
  }, {
    key: "socketSend",
    value: function socketSend(textMsg) {
      var _ref = this.socket,
          readyState = _ref.readyState;

      if (readyState === READY_STATE_STATUS.OPEN) {
        this.socket.send(JSON.stringify({
          content: textMsg,
          type: 'message'
        }));
      }
    }
  }, {
    key: "socketGetOldMsgs",
    value: function socketGetOldMsgs() {
      var _ref2 = this.socket,
          readyState = _ref2.readyState;

      if (readyState === READY_STATE_STATUS.OPEN) {
        this.socket.send(JSON.stringify({
          content: '0',
          type: 'get old'
        }));
      }
    }
  }, {
    key: "socketOnOpen",
    value: function socketOnOpen(callBack) {
      this.socket.addEventListener('open', function () {
        return callBack();
      });
    }
  }, {
    key: "socketClose",
    value: function socketClose() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

      // code = 1000 нормальное закрытие
      if (this.socket) {
        this.socket.close(code);
      }
    }
  }, {
    key: "socketOnClose",
    value: function socketOnClose() {
      this.socket.addEventListener('close', function (event) {
        if (event.wasClean) {// console.log('Соединение закрыто чисто');
        } else {// console.log('Обрыв соединения');
          } // console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      });
    }
  }, {
    key: "socketOnMessage",
    value: function socketOnMessage(callBack) {
      this.socket.addEventListener('message', function (event) {
        // console.log('Получены данные', event.data);
        callBack(event.data);
      });
    }
  }, {
    key: "socketOnError",
    value: function socketOnError() {// this.socket.addEventListener('error', (event: any) => {
      //   // console.log('Ошибка', event.message);
      // });
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      if (!this.subscribers[eventName]) {
        this.subscribers[eventName] = [];
      }

      this.subscribers[eventName].push(callback);
      return {
        unsubscribe: function () {
          this.subscribers[eventName] = this.subscribers[eventName].filter(function (subscriber) {
            return subscriber !== callback;
          });
        }.bind(this)
      };
    }
  }]);

  return WebSocketRun;
}();

exports.WebSocketRun = WebSocketRun;

_defineProperty(WebSocketRun, "_instance", void 0);