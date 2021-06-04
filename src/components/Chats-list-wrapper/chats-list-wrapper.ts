import { compile } from 'pug';
import { Block } from '../Block';
import { ChatList } from '../Chat-list';
import { tmplChatList } from './template';

type TPropsChatsList = {
  [propName: string]: any;
  chatsData: {
    id: string;
    avatar: string;
    title: string;
    created_by: number;
    [last_message: string]: any;
    unread_count: number;
  }[];
};

export class ChatsListWrapper extends Block<TPropsChatsList> {
  props: TPropsChatsList;

  constructor(props: TPropsChatsList) {
    super('div', {
      ...props,
      chatList: new ChatList(props),
    });
  }

  render(): string {
    const compiled = compile(tmplChatList);
    const html = compiled({
      chatList: this.props.chatList.render(),
    });
    return html;
  }
}
