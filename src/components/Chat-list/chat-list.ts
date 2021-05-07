import { compile } from 'pug';
import { Block } from '../Block';
import { tmplChatList } from './template';

type TPropsUserList = {
  userListData: {
    imgSrc: string;
    name: string;
    lastMsg: string;
    lastMsgdate: string;
    unreadMsg: number;
  }[];
  [propName: string]: any;
};

export class ChatList extends Block<TPropsUserList> {
  props: TPropsUserList;

  constructor(props: TPropsUserList) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplChatList);
    const html = compiled(this.props);
    return html;
  }
}
