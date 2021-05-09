import { renderDOM } from '../../utils/render-dom';
import { PopupChngAvatar } from '../../components/Popup-chng-avatar';
import { PopupAddUser } from '../../components/Popup-add-user';
import { PopupDeleteUser } from '../../components/Popup-delete-user';
import { PopupAddMedia } from '../../components/Popup-add-media';
import { PopupAddChat } from '../../components/Popup-add-chat';
import { PopupDeleteChat } from '../../components/Popup-delete-chat';
// import { getEventBus, actions } from '../EventBusInstance';
import { createStore, Actions } from '../Store';

export function mountPopups(): void {
  const store = createStore();

  // function popupAddChatHandler() {
  //   const popupAddChat = new PopupAddChat({});
  //   renderDOM('.body', popupAddChat.getContent());
  //   const addChatPopupState = store.getState().addChatPopup;

  //   if (addChatPopupState.showPopup) {
  //     popupAddChat.show('flex');
  //   } else {
  //     popupAddChat.hide();
  //   }
  // }
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
        popupAddChat.show('flex');
      } else {
        popupAddChat.hide();
      }
    } else if (addChatPopupState.showPopup) {
      popupAddChat = new PopupAddChat({});
      popupAddChat.setProps({ ...popupAddChat.props });
      document.querySelector('#add-chat-popup')?.remove();
      renderDOM('.body', popupAddChat.getContent());
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
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
        popupDeleteChat.show('flex');
      } else {
        popupDeleteChat.hide();
      }
    } else if (deleteChatPopupState.showPopup) {
      popupDeleteChat = new PopupDeleteChat({});
      popupDeleteChat.setProps({ ...popupDeleteChat.props, chatId, chatName });
      document.querySelector('#delete-chat-popup')?.remove();
      renderDOM('.body', popupDeleteChat.getContent());
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
    }
  }
  store.subscribe(Actions.DELETE_CHAT_POPUP_SHOW, popupDeleteChatHandler);

  function popupAddMediaHandler() {
    const popupAddMedia = new PopupAddMedia({});
    renderDOM('.body', popupAddMedia.getContent());
    const addMediaPopupState = store.getState().addMediaPopup;

    if (addMediaPopupState.showPopup) {
      popupAddMedia.show('flex');
    } else {
      popupAddMedia.hide();
    }
  }
  store.subscribe(Actions.ADD_MEDIA_POPUP_SHOW, popupAddMediaHandler);

  function popupDeleteUserHandler() {
    const popupDeleteUser = new PopupDeleteUser();
    renderDOM('.body', popupDeleteUser.getContent());
    const deleteUserPopupState = store.getState().deleteUserPopup;

    if (deleteUserPopupState.showPopup) {
      popupDeleteUser.show('flex');
    } else {
      popupDeleteUser.hide();
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
      console.log('Popup add user не найден в DOM!');
    }

    if (!popup) {
      popupChngAvatar = new PopupChngAvatar({});
      popupChngAvatar.setProps({ ...popupChngAvatar.props });
      renderDOM('.body', popupChngAvatar.getContent());

      if (chngAvatarPopupState.showPopup) {
        popupChngAvatar.show('flex');
      } else {
        popupChngAvatar.hide();
      }
    } else if (chngAvatarPopupState.showPopup) {
      popupChngAvatar = new PopupChngAvatar({});
      popupChngAvatar.setProps({ ...popupChngAvatar.props });
      document.querySelector('#chng-avatar-popup')?.remove();
      renderDOM('.body', popupChngAvatar.getContent());
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
    }
  }
  store.subscribe(Actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);

  function popupAddUserHandler() {
    let popup = null;
    const addUserPopupState = store.getState().addUserPopup;
    let popupAddChat = null;
    try {
      popup = document.body.querySelector<HTMLDivElement>('#add-user-popup');
    } catch {
      console.log('Popup add user не найден в DOM!');
    }

    if (!popup) {
      popupAddChat = new PopupAddUser({});
      popupAddChat.setProps({ ...popupAddChat.props });
      renderDOM('.body', popupAddChat.getContent());

      if (addUserPopupState.showPopup) {
        popupAddChat.show('flex');
      } else {
        popupAddChat.hide();
      }
    } else if (addUserPopupState.showPopup) {
      popupAddChat = new PopupAddUser({});
      popupAddChat.setProps({ ...popupAddChat.props });
      document.querySelector('#add-user-popup')?.remove();
      renderDOM('.body', popupAddChat.getContent());
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
    }
  }

  store.subscribe(Actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
}
