"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = reducer;

var _actions = require("./actions");

var _completeImgUrl = require("./utils/completeImgUrl");

var _updateUnreadCount = require("./utils/updateUnreadCount");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reducer(state, action) {
  var prevStateLocal;
  var showPopup;
  var chatId;
  var chatName;
  var data = action.data;

  switch (action.type) {
    case _actions.Actions.CHATS_UPDATE:
      prevStateLocal = state.chatsData || {};
      return _objectSpread(_objectSpread({}, state), {}, {
        chatsData: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          data: (0, _completeImgUrl.completeImgUrl)(data)
        })
      });

    case _actions.Actions.SET_UNREAD_COUNT:
      return _objectSpread(_objectSpread({}, state), {}, {
        chatsData: (0, _updateUnreadCount.updateUnreadCount)(data.activeChatId, data.unread_count)
      });

    case _actions.Actions.SET_ACTIVE_CHAT:
      return _objectSpread(_objectSpread({}, state), {}, {
        activeChatId: data.activeChatId
      });

    case _actions.Actions.REMOVE_ACTIVE_CHAT_ID:
      return _objectSpread(_objectSpread({}, state), {}, {
        activeChatId: data.activeChatId
      });

    case _actions.Actions.ADD_USER_POPUP_SHOW:
      prevStateLocal = state.addUserPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        addUserPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.CHNG_AVATAR_POPUP_SHOW:
      prevStateLocal = state.chngAvatarPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        chngAvatarPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.MSGS_CHNG_AVATAR_POPUP_SHOW:
      prevStateLocal = state.msgsChngAvatarPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        msgsChngAvatarPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.USER_MENU_POPUP_SHOW:
      prevStateLocal = state.userMenuPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        userMenuPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.DELETE_USER_FROM_CHAT:
      prevStateLocal = state.deleteUserPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        deleteUserPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.ADD_MEDIA_POPUP_SHOW:
      prevStateLocal = state.addMediaPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        addMediaPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.ADD_CHAT_POPUP_SHOW:
      prevStateLocal = state.addChatPopup || {};
      showPopup = data ? data.showPopup : false;
      return _objectSpread(_objectSpread({}, state), {}, {
        addChatPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup
        })
      });

    case _actions.Actions.DELETE_CHAT_POPUP_SHOW:
      prevStateLocal = state.deleteChatPopup || {};

      if (!data) {
        showPopup = false;
        chatId = null;
        chatName = null;
      } else {
        showPopup = data.showPopup;
        chatId = data.chatId;
        chatName = data.chatName;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        deleteChatPopup: _objectSpread(_objectSpread({}, prevStateLocal), {}, {
          showPopup: showPopup,
          chatId: chatId,
          chatName: chatName
        })
      });

    case _actions.Actions.GET_USER_DATA:
      prevStateLocal = state.userData || {};
      return _objectSpread(_objectSpread({}, state), {}, {
        userData: _objectSpread(_objectSpread({}, prevStateLocal), data)
      });

    case _actions.Actions.LOGOUT_CLEAN_DATA:
      return _objectSpread(_objectSpread({}, state), {}, {
        userData: {}
      });

    default:
      return state;
  }
}