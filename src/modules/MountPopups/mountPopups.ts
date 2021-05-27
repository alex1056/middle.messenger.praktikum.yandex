import { renderDOM } from '../../utils/render-dom';
import { PopupChngAvatar } from '../../components/Popup-chng-avatar';
import { PopupAddUser } from '../../components/Popup-add-user';
import { PopupDeleteUser } from '../../components/Popup-delete-user';
import { PopupAddMedia } from '../../components/Popup-add-media';
import { PopupAddChat } from '../../components/Popup-add-chat';
import { PopupDeleteChat } from '../../components/Popup-delete-chat';
import { PopupUserMenu } from '../../components/Popup-user-menu';
import { PopupMsgsChngAvatar } from '../../components/Popup-msgs-chng-avatar';

import { createStore, Actions } from '../Store';

export function mountPopups(): void {
  const store = createStore();

  function popupUserMenuHandler() {
    let popup = null;
    const userMenuPopupState = store.getState().userMenuPopup;

    let popupUserMenu = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#user-menu-popup');
    } catch {
      console.log('Popup UserMenu не найден в DOM!');
    }

    if (!popup) {
      popupUserMenu = new PopupUserMenu({});
      popupUserMenu.setProps({ ...popupUserMenu.props });
      renderDOM('.body', popupUserMenu.getContent());

      if (userMenuPopupState.showPopup) {
        popupUserMenu.show();
      } else {
        popupUserMenu.hide();
      }
    } else if (userMenuPopupState.showPopup) {
      popupUserMenu = new PopupUserMenu({});
      popupUserMenu.setProps({ ...popupUserMenu.props });
      document.querySelector('#user-menu-popup')?.remove();
      renderDOM('.body', popupUserMenu.getContent());
      // popup.style.display = 'flex';
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

  store.subscribe(Actions.USER_MENU_POPUP_SHOW, popupUserMenuHandler);

  function popupAddChatHandler() {
    let popup = null;
    const addChatPopupState = store.getState().addChatPopup;
    // const { chatId, chatName } = addChatPopupState;
    let popupAddChat = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#add-chat-popup');
    } catch {
      console.log('Popup add chat не найден в DOM!');
    }

    if (!popup) {
      popupAddChat = new PopupAddChat({});
      popupAddChat.setProps({ ...popupAddChat.props });
      renderDOM('.body', popupAddChat.getContent());

      if (addChatPopupState.showPopup) {
        popupAddChat.show();
      } else {
        popupAddChat.hide();
      }
    } else if (addChatPopupState.showPopup) {
      popupAddChat = new PopupAddChat({});
      popupAddChat.setProps({ ...popupAddChat.props });
      document.querySelector('#add-chat-popup')?.remove();
      renderDOM('.body', popupAddChat.getContent());
      // popup.style.display = 'flex';
      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }

  store.subscribe(Actions.ADD_CHAT_POPUP_SHOW, popupAddChatHandler);

  function popupDeleteChatHandler() {
    let popup = null;
    const deleteChatPopupState = store.getState().deleteChatPopup;
    const { chatId, chatName } = deleteChatPopupState;
    let popupDeleteChat = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#delete-chat-popup');
    } catch {
      console.log('Popup delete chat не найден в DOM!');
    }

    if (!popup) {
      popupDeleteChat = new PopupDeleteChat({});
      popupDeleteChat.setProps({ ...popupDeleteChat.props, chatId, chatName });
      renderDOM('.body', popupDeleteChat.getContent());

      if (deleteChatPopupState.showPopup) {
        popupDeleteChat.show();
      } else {
        popupDeleteChat.hide();
      }
    } else if (deleteChatPopupState.showPopup) {
      popupDeleteChat = new PopupDeleteChat({});
      popupDeleteChat.setProps({ ...popupDeleteChat.props, chatId, chatName });
      document.querySelector('#delete-chat-popup')?.remove();
      renderDOM('.body', popupDeleteChat.getContent());
      // popup.style.display = 'flex';
      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }
  store.subscribe(Actions.DELETE_CHAT_POPUP_SHOW, popupDeleteChatHandler);

  function popupAddMediaHandler() {
    const popupAddMedia = new PopupAddMedia({});
    renderDOM('.body', popupAddMedia.getContent());
    const addMediaPopupState = store.getState().addMediaPopup;

    if (addMediaPopupState.showPopup) {
      popupAddMedia.show();
    } else {
      popupAddMedia.hide();
    }
  }
  store.subscribe(Actions.ADD_MEDIA_POPUP_SHOW, popupAddMediaHandler);

  function popupDeleteUserHandler() {
    let popup = null;
    const deleteUserPopupState = store.getState().deleteUserPopup;
    const { showPopup } = deleteUserPopupState;
    let popupDeleteUser = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#delete-user-popup');
    } catch {
      console.log('Popup delete user не найден в DOM!');
    }

    if (!popup) {
      popupDeleteUser = new PopupDeleteUser({});
      popupDeleteUser.setProps({ ...popupDeleteUser.props, showPopup });
      renderDOM('.body', popupDeleteUser.getContent());

      if (deleteUserPopupState.showPopup) {
        popupDeleteUser.show();
      } else {
        popupDeleteUser.hide();
      }
    } else if (deleteUserPopupState.showPopup) {
      popupDeleteUser = new PopupDeleteUser({});
      popupDeleteUser.setProps({ ...popupDeleteUser.props, showPopup });
      document.querySelector('#delete-user-popup')?.remove();
      renderDOM('.body', popupDeleteUser.getContent());
      // popup.style.display = 'flex';
      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }
  store.subscribe(Actions.DELETE_USER_FROM_CHAT, popupDeleteUserHandler);

  function popupChngAvatarHandler() {
    let popup = null;
    const chngAvatarPopupState = store.getState().chngAvatarPopup;
    let popupChngAvatar = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#chng-avatar-popup');
    } catch {
      console.log('Popup change avatar не найден в DOM!');
    }

    if (!popup) {
      popupChngAvatar = new PopupChngAvatar({});
      popupChngAvatar.setProps({ ...popupChngAvatar.props });
      renderDOM('.body', popupChngAvatar.getContent());

      if (chngAvatarPopupState.showPopup) {
        popupChngAvatar.show();
      } else {
        popupChngAvatar.hide();
      }
    } else if (chngAvatarPopupState.showPopup) {
      popupChngAvatar = new PopupChngAvatar({});
      popupChngAvatar.setProps({ ...popupChngAvatar.props });
      document.querySelector('#chng-avatar-popup')?.remove();
      renderDOM('.body', popupChngAvatar.getContent());
      // popup.style.display = 'flex';
      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }
  store.subscribe(Actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);

  function popupMsgsChngAvatarHandler() {
    let popup = null;
    const msgsChngAvatarPopupState = store.getState().msgsChngAvatarPopup;
    let popupMsgsChngAvatar = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#msgs-chng-avatar-popup');
    } catch {
      console.log('Popup msgs change avatar не найден в DOM!');
    }

    if (!popup) {
      popupMsgsChngAvatar = new PopupMsgsChngAvatar({});
      popupMsgsChngAvatar.setProps({ ...popupMsgsChngAvatar.props });
      renderDOM('.body', popupMsgsChngAvatar.getContent());

      if (msgsChngAvatarPopupState.showPopup) {
        popupMsgsChngAvatar.show();
      } else {
        popupMsgsChngAvatar.hide();
      }
    } else if (msgsChngAvatarPopupState.showPopup) {
      popupMsgsChngAvatar = new PopupMsgsChngAvatar({});
      popupMsgsChngAvatar.setProps({ ...popupMsgsChngAvatar.props });
      document.querySelector('#msgs-chng-avatar-popup')?.remove();
      renderDOM('.body', popupMsgsChngAvatar.getContent());
      // popup.style.display = 'flex';
      popup.classList.remove('hidden');
    } else {
      // popup.style.display = 'none';
      popup.classList.add('hidden');
    }
  }
  store.subscribe(Actions.MSGS_CHNG_AVATAR_POPUP_SHOW, popupMsgsChngAvatarHandler);

  function popupAddUserHandler() {
    let popup = null;
    const addUserPopupState = store.getState().addUserPopup;
    let popupAddUser = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#add-user-popup');
    } catch {
      console.log('Popup add user не найден в DOM!');
    }

    if (!popup) {
      popupAddUser = new PopupAddUser({});
      popupAddUser.setProps({ ...popupAddUser.props });
      renderDOM('.body', popupAddUser.getContent());

      if (addUserPopupState.showPopup) {
        popupAddUser.show();
      } else {
        popupAddUser.hide();
      }
    } else if (addUserPopupState.showPopup) {
      popupAddUser = new PopupAddUser({});
      popupAddUser.setProps({ ...popupAddUser.props });
      document.querySelector('#add-user-popup')?.remove();
      renderDOM('.body', popupAddUser.getContent());
      popup.classList.remove('hidden');
    } else {
      popup.classList.add('hidden');
    }
  }

  store.subscribe(Actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
}
