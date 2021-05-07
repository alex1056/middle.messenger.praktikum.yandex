import { Actions } from './actions';
import { TState, TAction } from './types';

export function reducer(state: TState, action: TAction): TState {
  let prevStateLocal;
  let showPopup;
  const { data } = action;
  switch (action.type) {
    case Actions.CHATS_UPDATE:
      prevStateLocal = state.chats || {};
      return {
        ...state,
        chats: { ...prevStateLocal, data },
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
      } else {
        showPopup = data.showPopup;
      }

      return {
        ...state,
        deleteChatPopup: { ...prevStateLocal, showPopup },
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
