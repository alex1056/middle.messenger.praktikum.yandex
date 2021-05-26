"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountPopups = mountPopups;

var _renderDom = require("../../utils/render-dom");

var _PopupChngAvatar = require("../../components/Popup-chng-avatar");

var _PopupAddUser = require("../../components/Popup-add-user");

var _PopupDeleteUser = require("../../components/Popup-delete-user");

var _PopupAddMedia = require("../../components/Popup-add-media");

var _PopupAddChat = require("../../components/Popup-add-chat");

var _PopupDeleteChat = require("../../components/Popup-delete-chat");

var _PopupUserMenu = require("../../components/Popup-user-menu");

var _PopupMsgsChngAvatar = require("../../components/Popup-msgs-chng-avatar");

var _Store = require("../Store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mountPopups() {
  var store = (0, _Store.createStore)();

  function popupUserMenuHandler() {
    var popup = null;
    var userMenuPopupState = store.getState().userMenuPopup;
    var popupUserMenu = null;

    try {
      popup = document.body.querySelector('#user-menu-popup');
    } catch (_unused) {
      console.log('Popup UserMenu не найден в DOM!');
    }

    if (!popup) {
      popupUserMenu = new _PopupUserMenu.PopupUserMenu({});
      popupUserMenu.setProps(_objectSpread({}, popupUserMenu.props));
      (0, _renderDom.renderDOM)('.body', popupUserMenu.getContent());

      if (userMenuPopupState.showPopup) {
        popupUserMenu.show();
      } else {
        popupUserMenu.hide();
      }
    } else if (userMenuPopupState.showPopup) {
      var _document$querySelect;

      popupUserMenu = new _PopupUserMenu.PopupUserMenu({});
      popupUserMenu.setProps(_objectSpread({}, popupUserMenu.props));
      (_document$querySelect = document.querySelector('#user-menu-popup')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.remove();
      (0, _renderDom.renderDOM)('.body', popupUserMenu.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }

    if (popup && userMenuPopupState.showPopup) {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.USER_MENU_POPUP_SHOW, popupUserMenuHandler);

  function popupAddChatHandler() {
    var popup = null;
    var addChatPopupState = store.getState().addChatPopup; // const { chatId, chatName } = addChatPopupState;

    var popupAddChat = null;

    try {
      popup = document.body.querySelector('#add-chat-popup');
    } catch (_unused2) {
      console.log('Popup add chat не найден в DOM!');
    }

    if (!popup) {
      popupAddChat = new _PopupAddChat.PopupAddChat({});
      popupAddChat.setProps(_objectSpread({}, popupAddChat.props));
      (0, _renderDom.renderDOM)('.body', popupAddChat.getContent());

      if (addChatPopupState.showPopup) {
        popupAddChat.show();
      } else {
        popupAddChat.hide();
      }
    } else if (addChatPopupState.showPopup) {
      var _document$querySelect2;

      popupAddChat = new _PopupAddChat.PopupAddChat({});
      popupAddChat.setProps(_objectSpread({}, popupAddChat.props));
      (_document$querySelect2 = document.querySelector('#add-chat-popup')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.remove();
      (0, _renderDom.renderDOM)('.body', popupAddChat.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.ADD_CHAT_POPUP_SHOW, popupAddChatHandler);

  function popupDeleteChatHandler() {
    var popup = null;
    var deleteChatPopupState = store.getState().deleteChatPopup;
    var chatId = deleteChatPopupState.chatId,
        chatName = deleteChatPopupState.chatName;
    var popupDeleteChat = null;

    try {
      popup = document.body.querySelector('#delete-chat-popup');
    } catch (_unused3) {
      console.log('Popup delete chat не найден в DOM!');
    }

    if (!popup) {
      popupDeleteChat = new _PopupDeleteChat.PopupDeleteChat({});
      popupDeleteChat.setProps(_objectSpread(_objectSpread({}, popupDeleteChat.props), {}, {
        chatId: chatId,
        chatName: chatName
      }));
      (0, _renderDom.renderDOM)('.body', popupDeleteChat.getContent());

      if (deleteChatPopupState.showPopup) {
        popupDeleteChat.show();
      } else {
        popupDeleteChat.hide();
      }
    } else if (deleteChatPopupState.showPopup) {
      var _document$querySelect3;

      popupDeleteChat = new _PopupDeleteChat.PopupDeleteChat({});
      popupDeleteChat.setProps(_objectSpread(_objectSpread({}, popupDeleteChat.props), {}, {
        chatId: chatId,
        chatName: chatName
      }));
      (_document$querySelect3 = document.querySelector('#delete-chat-popup')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.remove();
      (0, _renderDom.renderDOM)('.body', popupDeleteChat.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.DELETE_CHAT_POPUP_SHOW, popupDeleteChatHandler);

  function popupAddMediaHandler() {
    var popupAddMedia = new _PopupAddMedia.PopupAddMedia({});
    (0, _renderDom.renderDOM)('.body', popupAddMedia.getContent());
    var addMediaPopupState = store.getState().addMediaPopup;

    if (addMediaPopupState.showPopup) {
      popupAddMedia.show();
    } else {
      popupAddMedia.hide();
    }
  }

  store.subscribe(_Store.Actions.ADD_MEDIA_POPUP_SHOW, popupAddMediaHandler);

  function popupDeleteUserHandler() {
    var popup = null;
    var deleteUserPopupState = store.getState().deleteUserPopup;
    var showPopup = deleteUserPopupState.showPopup;
    var popupDeleteUser = null;

    try {
      popup = document.body.querySelector('#delete-user-popup');
    } catch (_unused4) {
      console.log('Popup delete user не найден в DOM!');
    }

    if (!popup) {
      popupDeleteUser = new _PopupDeleteUser.PopupDeleteUser({});
      popupDeleteUser.setProps(_objectSpread(_objectSpread({}, popupDeleteUser.props), {}, {
        showPopup: showPopup
      }));
      (0, _renderDom.renderDOM)('.body', popupDeleteUser.getContent());

      if (deleteUserPopupState.showPopup) {
        popupDeleteUser.show();
      } else {
        popupDeleteUser.hide();
      }
    } else if (deleteUserPopupState.showPopup) {
      var _document$querySelect4;

      popupDeleteUser = new _PopupDeleteUser.PopupDeleteUser({});
      popupDeleteUser.setProps(_objectSpread(_objectSpread({}, popupDeleteUser.props), {}, {
        showPopup: showPopup
      }));
      (_document$querySelect4 = document.querySelector('#delete-user-popup')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.remove();
      (0, _renderDom.renderDOM)('.body', popupDeleteUser.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.DELETE_USER_FROM_CHAT, popupDeleteUserHandler);

  function popupChngAvatarHandler() {
    var popup = null;
    var chngAvatarPopupState = store.getState().chngAvatarPopup;
    var popupChngAvatar = null;

    try {
      popup = document.body.querySelector('#chng-avatar-popup');
    } catch (_unused5) {
      console.log('Popup change avatar не найден в DOM!');
    }

    if (!popup) {
      popupChngAvatar = new _PopupChngAvatar.PopupChngAvatar({});
      popupChngAvatar.setProps(_objectSpread({}, popupChngAvatar.props));
      (0, _renderDom.renderDOM)('.body', popupChngAvatar.getContent());

      if (chngAvatarPopupState.showPopup) {
        popupChngAvatar.show();
      } else {
        popupChngAvatar.hide();
      }
    } else if (chngAvatarPopupState.showPopup) {
      var _document$querySelect5;

      popupChngAvatar = new _PopupChngAvatar.PopupChngAvatar({});
      popupChngAvatar.setProps(_objectSpread({}, popupChngAvatar.props));
      (_document$querySelect5 = document.querySelector('#chng-avatar-popup')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.remove();
      (0, _renderDom.renderDOM)('.body', popupChngAvatar.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);

  function popupMsgsChngAvatarHandler() {
    var popup = null;
    var msgsChngAvatarPopupState = store.getState().msgsChngAvatarPopup;
    var popupMsgsChngAvatar = null;

    try {
      popup = document.body.querySelector('#msgs-chng-avatar-popup');
    } catch (_unused6) {
      console.log('Popup msgs change avatar не найден в DOM!');
    }

    if (!popup) {
      popupMsgsChngAvatar = new _PopupMsgsChngAvatar.PopupMsgsChngAvatar({});
      popupMsgsChngAvatar.setProps(_objectSpread({}, popupMsgsChngAvatar.props));
      (0, _renderDom.renderDOM)('.body', popupMsgsChngAvatar.getContent());

      if (msgsChngAvatarPopupState.showPopup) {
        popupMsgsChngAvatar.show();
      } else {
        popupMsgsChngAvatar.hide();
      }
    } else if (msgsChngAvatarPopupState.showPopup) {
      var _document$querySelect6;

      popupMsgsChngAvatar = new _PopupMsgsChngAvatar.PopupMsgsChngAvatar({});
      popupMsgsChngAvatar.setProps(_objectSpread({}, popupMsgsChngAvatar.props));
      (_document$querySelect6 = document.querySelector('#msgs-chng-avatar-popup')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.remove();
      (0, _renderDom.renderDOM)('.body', popupMsgsChngAvatar.getContent()); // popup.style.display = 'flex';

      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.MSGS_CHNG_AVATAR_POPUP_SHOW, popupMsgsChngAvatarHandler);

  function popupAddUserHandler() {
    var popup = null;
    var addUserPopupState = store.getState().addUserPopup;
    var popupAddUser = null;

    try {
      popup = document.body.querySelector('#add-user-popup');
    } catch (_unused7) {
      console.log('Popup add user не найден в DOM!');
    }

    if (!popup) {
      popupAddUser = new _PopupAddUser.PopupAddUser({});
      popupAddUser.setProps(_objectSpread({}, popupAddUser.props));
      (0, _renderDom.renderDOM)('.body', popupAddUser.getContent());

      if (addUserPopupState.showPopup) {
        popupAddUser.show();
      } else {
        popupAddUser.hide();
      }
    } else if (addUserPopupState.showPopup) {
      var _document$querySelect7;

      popupAddUser = new _PopupAddUser.PopupAddUser({});
      popupAddUser.setProps(_objectSpread({}, popupAddUser.props));
      (_document$querySelect7 = document.querySelector('#add-user-popup')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.remove();
      (0, _renderDom.renderDOM)('.body', popupAddUser.getContent());
      popup.classList.remove('hidden');
    } else {
      popup.classList.add('hidden');
    }
  }

  store.subscribe(_Store.Actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
}