"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transfromChatsData = void 0;

var _msgTime = require("./msg-time");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transfromChatsData = function transfromChatsData(chatsDataReply) {
  if (chatsDataReply && chatsDataReply.length) {
    return chatsDataReply.reduce(function (acc, item) {
      if (item.last_message) {
        item.last_message = JSON.parse(item.last_message);

        if (item.last_message) {
          item.last_message = _objectSpread(_objectSpread({}, item.last_message), {}, {
            time: (0, _msgTime.lastMsgTimeToString)(item.last_message.time)
          });
          acc.push(_objectSpread(_objectSpread({}, item), {}, {
            last_message: item.last_message
          }));
          return acc;
        }
      } // if (item.last_message) {
      //   let { last_message } = item;
      //   if (last_message.time) {
      //     last_message = { ...last_message, time: lastMsgTimeToString(last_message.time) };
      //     acc.push({ ...item, last_message });
      //     return acc;
      //   }
      //   return acc;
      // }


      acc.push(item);
      return acc;
    }, []);
  }

  return chatsDataReply;
};

exports.transfromChatsData = transfromChatsData;