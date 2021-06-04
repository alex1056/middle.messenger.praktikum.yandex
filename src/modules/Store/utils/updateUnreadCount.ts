import { createStore } from '..';

export const updateUnreadCount = (activeChatId: number, unread_count: number) => {
  const store = createStore();
  const { chatsData } = store.getState();
  const newData = chatsData.data.map((item: any) => {
    if (item.id === activeChatId) {
      return { ...item, unread_count };
    }
    return item;
  });
  return { data: newData };
};
