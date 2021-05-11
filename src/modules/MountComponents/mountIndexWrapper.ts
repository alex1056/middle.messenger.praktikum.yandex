import { createStore, Actions } from '../Store';
import { Api, urlApiResources } from '../Api';
// import { transfromChatsData } from '../../utils/transfrom-chats-data';
import { IndexWrapper } from '../../components/Index-wrapper';
import { ChatsListWrapper } from '../../components/Chats-list-wrapper';

const api = new Api();
const store = createStore();

export const mountIndexWrapper = () => {
  const handleIndexWrapper = () => {
    const { chatsData } = store.getState();
    IndexWrapper._instance.setProps({
      ...IndexWrapper._instance.props,
      chatList: new ChatsListWrapper({ ...IndexWrapper._instance.props, chatsData: chatsData.data }),
    });
  };

  store.subscribe(Actions.CHATS_UPDATE, handleIndexWrapper);
};
