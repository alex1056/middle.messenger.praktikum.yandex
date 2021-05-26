"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountIndexWrapper = void 0;

var _Store = require("../Store");

var _IndexWrapper = require("../../components/Index-wrapper");

var _ChatsListWrapper = require("../../components/Chats-list-wrapper");

var _Msgs = require("../../components/Msgs");

var _Router = require("../Router");

var store = (0, _Store.createStore)();
var router = new _Router.Router('.page');

var mountIndexWrapper = function mountIndexWrapper() {
  var handleIndexWrapper = function handleIndexWrapper() {
    var _store$getState = store.getState(),
        chatsData = _store$getState.chatsData;

    var _store$getState2 = store.getState(),
        activeChatId = _store$getState2.activeChatId;

    var activeChatData = (0, _Store.chatsDataSelector)(activeChatId);
    var history = router.history;
    var state = history.state;
    var activeChatIdLocal = activeChatId;

    if (!state) {
      activeChatIdLocal = null;
    }

    _IndexWrapper.IndexWrapper._instance.setProps({
      activeChatData: activeChatIdLocal ? activeChatData : null,
      activeChatId: Number(activeChatIdLocal),
      // ...IndexWrapper._instance.props,
      chatList: new _ChatsListWrapper.ChatsListWrapper({
        // ...IndexWrapper._instance.props,
        activeChatId: Number(activeChatIdLocal),
        chatsData: chatsData.data
      }),
      msgs: new _Msgs.Msgs({
        // ...IndexWrapper._instance.props,
        activeChatId: Number(activeChatIdLocal),
        activeChatData: activeChatIdLocal ? activeChatData : null
      })
    });
  };

  store.subscribe(_Store.Actions.CHATS_UPDATE, handleIndexWrapper);
  store.subscribe(_Store.Actions.SET_ACTIVE_CHAT, handleIndexWrapper);
};

exports.mountIndexWrapper = mountIndexWrapper;