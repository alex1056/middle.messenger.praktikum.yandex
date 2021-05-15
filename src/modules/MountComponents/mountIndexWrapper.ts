import { createStore, Actions, chatsDataSelector } from '../Store';
// import { Api } from '../Api';
// import { transfromChatsData } from '../../utils/transfrom-chats-data';
import { IndexWrapper } from '../../components/Index-wrapper';
import { ChatsListWrapper } from '../../components/Chats-list-wrapper';
import { Msgs } from '../../components/Msgs';

// const api = new Api();
const store = createStore();

export const mountIndexWrapper = () => {
  const handleIndexWrapper = () => {
    const { chatsData } = store.getState();
    const { activeChatId } = store.getState();
    console.log('handleIndexWrapper, activeChatId=', activeChatId);
    const activeChatData = chatsDataSelector(activeChatId);
    console.log('activeChatData=', activeChatData);
    IndexWrapper._instance.setProps({
      activeChatData,
      // chatId: activeChatId,
      ...IndexWrapper._instance.props,
      chatList: new ChatsListWrapper({ ...IndexWrapper._instance.props, chatsData: chatsData.data }),
      msgs: new Msgs({ ...IndexWrapper._instance.props, chatId: activeChatId, activeChatData }),
    });
  };
  store.subscribe(Actions.CHATS_UPDATE, handleIndexWrapper);
  store.subscribe(Actions.SET_ACTIVE_CHAT, handleIndexWrapper);
};
