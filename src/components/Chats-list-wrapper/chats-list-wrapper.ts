import { compile } from 'pug';
import { Block } from '../Block';
import { ChatList } from '../Chat-list';
import { tmplChatList } from './template';

type TPropsChatsList = {
  [propName: string]: any;
  userListData: {
    imgSrc: string;
    name: string;
    lastMsg: string;
    lastMsgdate: string;
    unreadMsg: number;
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
