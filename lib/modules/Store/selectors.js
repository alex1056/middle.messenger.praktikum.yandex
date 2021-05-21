"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatsDataSelector = void 0;

var _index = require("./index");

var store = (0, _index.createStore)();

var chatsDataSelector = function chatsDataSelector(chatId) {
  var _store$getState = store.getState(),
      chatsData = _store$getState.chatsData;

  var activeChatData = chatsData.data.filter(function (item) {
    if (item.id === Number(chatId)) {
      return true;
    }

    return false;
  });

  if (activeChatData.length) {
    return activeChatData[0];
  }

  return null;
};

exports.chatsDataSelector = chatsDataSelector;