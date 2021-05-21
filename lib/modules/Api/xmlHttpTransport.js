"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPTransport = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function queryParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(params).map(function (k) {
    return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(params[k]));
  }).join('&');
}

function withQuery(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var queryString = queryParams(params);
  return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
}

function parseXHRResult(xhr) {
  // console.log('xhr=', xhr);
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: function json() {
      return JSON.parse(xhr.responseText);
    }
  };
}

function errorResponse(xhr) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: function json() {
      return JSON.parse(message || xhr.statusText);
    }
  };
}

var METHODS;

(function (METHODS) {
  METHODS["GET"] = "GET";
  METHODS["POST"] = "POST";
  METHODS["PUT"] = "PUT";
  METHODS["PATCH"] = "PATCH";
  METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));

var HTTPTransport = function HTTPTransport() {
  var _this = this;

  _classCallCheck(this, HTTPTransport);

  _defineProperty(this, "get", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var data = options.data;

    if (data) {
      return _this.request(withQuery(url, data), _objectSpread(_objectSpread({}, options), {}, {
        method: METHODS.GET
      }), options.timeout);
    }

    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.GET
    }), options.timeout);
  });

  _defineProperty(this, "post", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.POST
    }), options.timeout);
  });

  _defineProperty(this, "put", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.PUT
    }), options.timeout);
  });

  _defineProperty(this, "delete", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.DELETE
    }), options.timeout);
  });

  _defineProperty(this, "reject", function (err) {
    throw new Error(err);
  });

  _defineProperty(this, "request", function (url, options) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
    var method = options.method,
        headers = options.headers,
        data = options.data,
        form = options.form;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.open(method, url);

      try {
        if (headers) {
          Object.keys(headers).forEach(function (key) {
            return xhr.setRequestHeader(key, headers[key]);
          });
        }
      } catch (err) {
        console.log('Ошибка во время установки заголовков', err);
      }

      xhr.onload = function () {
        return resolve(parseXHRResult(xhr));
      };

      xhr.onerror = function () {
        return resolve(errorResponse(xhr, 'Невозможно сделать запрос'));
      };

      xhr.ontimeout = function () {
        resolve(errorResponse(xhr, 'Время ожидания запроса истекло'));
      };

      xhr.onabort = function (e) {
        reject(e);
      };

      if (!data && !form) {
        xhr.send();
      } else if (form) {
        xhr.send(form);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  });
};

exports.HTTPTransport = HTTPTransport;