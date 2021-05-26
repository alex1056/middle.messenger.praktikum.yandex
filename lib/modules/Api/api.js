"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = void 0;

var _xmlHttpTransport = require("./xmlHttpTransport");

var _config = require("./config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Api = function Api() {
  var _this = this;

  _classCallCheck(this, Api);

  _defineProperty(this, "api", void 0);

  _defineProperty(this, "signUp", function (options) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.post("".concat(_config.urlApi, "/auth/signup"), _objectSpread(_objectSpread({}, options), {}, {
      headers: headers
    }));
  });

  _defineProperty(this, "signIn", function (options) {
    var data = options.data;
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.post("".concat(_config.urlApi, "/auth/signin"), {
      data: data,
      headers: headers
    });
  });

  _defineProperty(this, "logOut", function () {
    return _this.api.post("".concat(_config.urlApi, "/auth/logout"), {});
  });

  _defineProperty(this, "getUserData", function () {
    return _this.api.get("".concat(_config.urlApi, "/auth/user"), {});
  });

  _defineProperty(this, "getNewMsgCount", function (chatId) {
    return _this.api.get("".concat(_config.urlApi, "/chats/new/").concat(chatId), {});
  });

  _defineProperty(this, "chngUserProfileData", function (options) {
    var data = options.data;
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.put("".concat(_config.urlApi, "/user/profile"), {
      data: data,
      headers: headers
    });
  });

  _defineProperty(this, "chngUserPassword", function (options) {
    var data = options.data;
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.put("".concat(_config.urlApi, "/user/password"), {
      data: data,
      headers: headers
    });
  });

  _defineProperty(this, "chngUserAvatar", function (options) {
    var form = options.form;
    return _this.api.put("".concat(_config.urlApi, "/user/profile/avatar"), {
      form: form
    });
  });

  _defineProperty(this, "chngChatAvatar", function (options) {
    var form = options.form;
    return _this.api.put("".concat(_config.urlApi, "/chats/avatar"), {
      form: form
    });
  });

  _defineProperty(this, "getChats", function () {
    return _this.api.get("".concat(_config.urlApi, "/chats"), {});
  });

  _defineProperty(this, "createChat", function (title) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.post("".concat(_config.urlApi, "/chats"), {
      data: {
        title: title
      },
      headers: headers
    });
  });

  _defineProperty(this, "addUsersToChat", function (users, chatId) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.put("".concat(_config.urlApi, "/chats/users"), {
      data: {
        users: users,
        chatId: chatId
      },
      headers: headers
    });
  });

  _defineProperty(this, "deleteUsersFromChat", function (users, chatId) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api["delete"]("".concat(_config.urlApi, "/chats/users"), {
      data: {
        users: users,
        chatId: chatId
      },
      headers: headers
    });
  });

  _defineProperty(this, "findUser", function (login) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.post("".concat(_config.urlApi, "/user/search"), {
      data: {
        login: login
      },
      headers: headers
    });
  });

  _defineProperty(this, "getChatToken", function (chatId) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.post("".concat(_config.urlApi, "/chats/token/").concat(chatId), {
      headers: headers
    });
  });

  _defineProperty(this, "deleteChat", function (chatId) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api["delete"]("".concat(_config.urlApi, "/chats"), {
      data: {
        chatId: chatId
      },
      headers: headers
    });
  });

  _defineProperty(this, "getChatUsers", function (chatId) {
    var headers = {
      'content-type': 'application/json'
    };
    return _this.api.get("".concat(_config.urlApi, "/chats/").concat(chatId, "/users"), {
      headers: headers
    });
  });

  _defineProperty(this, "getChatFiles", function (chatId) {
    return _this.api.get("".concat(_config.urlApi, "/chats/").concat(chatId, "/files"));
  });

  _defineProperty(this, "getChatsToken", function (chatId) {
    return _this.api.post("".concat(_config.urlApi, "/chats/token/").concat(chatId));
  });

  this.api = new _xmlHttpTransport.HTTPTransport();
};

exports.Api = Api;