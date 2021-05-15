import { createStore } from './index';

const store = createStore();

export const chatsDataSelector = (chatId: number) => {
  const { chatsData } = store.getState();
  const activeChatData = chatsData.data.filter((item: any) => {
    if (item.id === Number(chatId)) {
      return true;
    }
    return false;
  });
  if (activeChatData.length) {
    return activeChatData[0];
  }
  return null;
};
