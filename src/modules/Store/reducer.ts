import { Actions } from './actions';
import { TState, TAction } from './types';
import { completeImgUrl } from './utils/completeImgUrl';
import { updateUnreadCount } from './utils/updateUnreadCount';

export function reducer(state: TState, action: TAction): TState {
  let prevStateLocal;
  let showPopup;
  let chatId;
  let chatName;
  const { data } = action;

  switch (action.type) {
    case Actions.CHATS_UPDATE:
      prevStateLocal = state.chatsData || {};

      return {
        ...state,
        chatsData: { ...prevStateLocal, data: completeImgUrl(data) },
      };

    case Actions.SET_UNREAD_COUNT:
      return {
        ...state,
        chatsData: updateUnreadCount(data.activeChatId, data.unread_count),
      };

    case Actions.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChatId: data.activeChatId,
      };

    case Actions.REMOVE_ACTIVE_CHAT_ID:
      return {
        ...state,
        activeChatId: data.activeChatId,
      };

    case Actions.ADD_USER_POPUP_SHOW:
      prevStateLocal = state.addUserPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        addUserPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.CHNG_AVATAR_POPUP_SHOW:
      prevStateLocal = state.chngAvatarPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        chngAvatarPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.MSGS_CHNG_AVATAR_POPUP_SHOW:
      prevStateLocal = state.msgsChngAvatarPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        msgsChngAvatarPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.USER_MENU_POPUP_SHOW:
      prevStateLocal = state.userMenuPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        userMenuPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.DELETE_USER_FROM_CHAT:
      prevStateLocal = state.deleteUserPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        deleteUserPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.ADD_MEDIA_POPUP_SHOW:
      prevStateLocal = state.addMediaPopup || {};

      showPopup = data ? data.showPopup : false;

      return {
        ...state,
        addMediaPopup: { ...prevStateLocal, showPopup },
      };

    case Actions.ADD_CHAT_POPUP_SHOW:
      prevStateLocal = state.addChatPopup || {};

      showPopup = data ? data.showPopup : false;

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
