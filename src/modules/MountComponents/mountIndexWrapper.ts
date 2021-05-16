import { createStore, Actions, chatsDataSelector } from '../Store';
// import { Api } from '../Api';
// import { transfromChatsData } from '../../utils/transfrom-chats-data';
import { IndexWrapper } from '../../components/Index-wrapper';
import { ChatsListWrapper } from '../../components/Chats-list-wrapper';
import { Msgs } from '../../components/Msgs';
import { Router } from '../Router';

// const api = new Api();
const store = createStore();
const router = new Router('.page');

export const mountIndexWrapper = () => {
  const handleIndexWrapper = () => {
    const { chatsData } = store.getState();
    const { activeChatId } = store.getState();

    const activeChatData = chatsDataSelector(activeChatId);

    // console.log(router);
    const { history } = router;
    const { state } = history;

    let activeChatIdLocal = activeChatId;
    if (!state) {
      activeChatIdLocal = null;
      store.dispatch({
        type: Actions.REMOVE_ACTIVE_CHAT_ID,
        data: { activeChatId: null },
      });
    }

    IndexWrapper._instance.setProps({
      activeChatData,
      activeChatId: Number(activeChatIdLocal),
      ...IndexWrapper._instance.props,
      chatList: new ChatsListWrapper({
        ...IndexWrapper._instance.props,
        activeChatId: Number(activeChatIdLocal),
        chatsData: chatsData.data,
      }),
      msgs: new Msgs({ ...IndexWrapper._instance.props, activeChatId: Number(activeChatIdLocal), activeChatData }),
    });
  };
  store.subscribe(Actions.CHATS_UPDATE, handleIndexWrapper);
  store.subscribe(Actions.SET_ACTIVE_CHAT, handleIndexWrapper);
};
