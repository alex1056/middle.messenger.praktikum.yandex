import { Actions } from './actions';
import { TState, TAction } from './types';
import { completeImgUrl } from './utils/completeImgUrl';

export function reducer(state: TState, action: TAction): TState {
  let prevStateLocal;
  let showPopup;
  let chatId;
  let chatName;
  const { data } = action;
  // console.log(data);
  switch (action.type) {
    case Actions.CHATS_UPDATE:
      prevStateLocal = state.chatsData || {};

      return {
        ...state,
        chatsData: { ...prevStateLocal, data: completeImgUrl(data) },
        // chatsData: {},
      };

    case Actions.SET_ACTIVE_CHAT:
      // prevStateLocal = state.chatsData || {};
      return {
        ...state,
        activeChatId: data.activeChatId,
      };

    case Actions.REMOVE_ACTIVE_CHAT_ID:
      // prevStateLocal = state.chatsData || {};
      return {
        ...state,
        activeChatId: data.activeChatId,
      };

    case Actions.ADD_USER_POPUP_SHOW:
      prevStateLocal = state.addUserPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        addUserPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.CHNG_AVATAR_POPUP_SHOW:
      prevStateLocal = state.chngAvatarPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        chngAvatarPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.USER_MENU_POPUP_SHOW:
      prevStateLocal = state.userMenuPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        userMenuPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.DELETE_USER_FROM_CHAT:
      prevStateLocal = state.deleteUserPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        deleteUserPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.ADD_MEDIA_POPUP_SHOW:
      prevStateLocal = state.addMediaPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        addMediaPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.ADD_CHAT_POPUP_SHOW:
      prevStateLocal = state.addChatPopup || {};

      if (!data) {
        showPopup = false;
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        addChatPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.DELETE_CHAT_POPUP_SHOW:
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

      return {
        ...state,
        deleteChatPopup: { ...prevStateLocal, showPopup, chatId, chatName },
      };

    case Actions.GET_USER_DATA:
      prevStateLocal = state.userData || {};

      return {
        ...state,
        userData: { ...prevStateLocal, ...data },
      };

    case Actions.LOGOUT_CLEAN_DATA:
      return {
        ...state,
        userData: {},
      };

    default:
      return state;
  }
}
