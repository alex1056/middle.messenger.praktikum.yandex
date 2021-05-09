import { urlApiResources } from '../modules/Api';
import { lastMsgTimeToString } from './msg-time';

export const transfromChatsData = (chatsDataReply: []) => {
  if (chatsDataReply && chatsDataReply.length) {
    return chatsDataReply.reduce((acc: any, item: any) => {
      if (item.avatar) {
        item.avatar = `${urlApiResources}${item.avatar}`;
      }

      if (item.last_message) {
        let { last_message } = item;
        if (last_message.time) {
          last_message = { ...last_message, time: lastMsgTimeToString(last_message.time) };
          acc.push({ ...item, last_message });
          return acc;
        }
        return acc;
      }
      acc.push(item);
      return acc;
    }, []);
  }
  return chatsDataReply;
};
