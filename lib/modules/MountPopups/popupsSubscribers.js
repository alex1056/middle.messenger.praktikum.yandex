"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPopupsSubscribers = setPopupsSubscribers;

var _Store = require("../Store");

var _ProfileForm = require("../../components/Profile-form");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setPopupsSubscribers() {
  var store = (0, _Store.createStore)();

  function updateAvatar() {
    var profileForm = new _ProfileForm.ProfileForm({});

    var _store$getState = store.getState(),
        userData = _store$getState.userData;

    profileForm.setProps(_objectSpread(_objectSpread({}, _ProfileForm.ProfileForm._instance.props), {}, {
      data: userData
    }));
  }

  store.subscribe(_Store.Actions.UPDATE_USER_AVATAR, updateAvatar);
} // export function mountPopups(): void {
//   const store = createStore();
//   function popupAddMediaHandler() {
//     const popupAddMedia = new PopupAddMedia({});
//     renderDOM('.body', popupAddMedia.getContent());
//     const addMediaPopupState = store.getState().addMediaPopup;
//     if (addMediaPopupState.showPopup) {
//       popupAddMedia.show('flex');
//     } else {
//       popupAddMedia.hide();
//     }
//   }
//   store.subscribe(Actions.ADD_MEDIA_POPUP_SHOW, popupAddMediaHandler);
//   function popupDeleteUserHandler() {
//     const popupDeleteUser = new PopupDeleteUser();
//     renderDOM('.body', popupDeleteUser.getContent());
//     const deleteUserPopupState = store.getState().deleteUserPopup;
//     if (deleteUserPopupState.showPopup) {
//       popupDeleteUser.show('flex');
//     } else {
//       popupDeleteUser.hide();
//     }
//   }
//   store.subscribe(Actions.DELETE_USER_FROM_CHAT, popupDeleteUserHandler);
//   function popupChngAvatarHandler() {
//     const popupChngAvatar = new PopupChngAvatar();
//     renderDOM('.body', popupChngAvatar.getContent());
//     const { chngAvatarPopup } = store.getState();
//     if (chngAvatarPopup.showPopup) {
//       popupChngAvatar.show('flex');
//     } else {
//       popupChngAvatar.hide();
//     }
//   }
//   store.subscribe(Actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);
//   function popupAddUserHandler() {
//     const popupAddUser = new PopupAddUser();
//     renderDOM('.body', popupAddUser.getContent());
//     const { addUserPopup } = store.getState();
//     if (addUserPopup.showPopup) {
//       popupAddUser.show('flex');
//     } else {
//       popupAddUser.hide();
//     }
//   }
//   store.subscribe(Actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
// }