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

    case Actions.ADD_MEDIA_SHOW_POPUP:
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

    default:
      return state;
  }
}
