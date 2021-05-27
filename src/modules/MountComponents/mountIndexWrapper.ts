import { createStore, Actions, chatsDataSelector } from '../Store';

import { IndexWrapper } from '../../components/Index-wrapper';
import { ChatsListWrapper } from '../../components/Chats-list-wrapper';
import { Msgs } from '../../components/Msgs';
import { Router } from '../Router';

const store = createStore();
const router = new Router('.page');

export const mountIndexWrapper = () => {
  const handleIndexWrapper = () => {
    const { chatsData } = store.getState();
    const { activeChatId } = store.getState();

    const activeChatData = chatsDataSelector(activeChatId);

    const { history } = router;
    const { state } = history;

    let activeChatIdLocal = activeChatId;
    if (!state) {
      activeChatIdLocal = null;
    }

    IndexWrapper._instance.setProps({
      activeChatData: activeChatIdLocal ? activeChatData : null,
      activeChatId: Number(activeChatIdLocal),
      // ...IndexWrapper._instance.props,
      chatList: new ChatsListWrapper({
        // ...IndexWrapper._instance.props,
        activeChatId: Number(activeChatIdLocal),
        chatsData: chatsData.data,
      }),
      msgs: new Msgs({
        // ...IndexWrapper._instance.props,
        activeChatId: Number(activeChatIdLocal),
        activeChatData: activeChatIdLocal ? activeChatData : null,
      }),
    });
  };
  store.subscribe(Actions.CHATS_UPDATE, handleIndexWrapper);
  store.subscribe(Actions.SET_ACTIVE_CHAT, handleIndexWrapper);
};
