import { compile } from 'pug';
import { Block } from '../Block';
import { UserList } from '../User-list';
import { tmplChatsList } from './template';

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

export class ChatsList extends Block<TPropsChatsList> {
  props: TPropsChatsList;

  constructor(props: TPropsChatsList) {
    super('div', {
      ...props,
      userList: new UserList(props),
    });
  }

  render(): string {
    const compiled = compile(tmplChatsList);
    const html = compiled({
      userList: this.props.userList.render(),
    });
    return html;
  }
}
