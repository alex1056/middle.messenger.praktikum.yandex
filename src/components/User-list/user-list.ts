import { Block } from '../Block';
import { tmplUserList } from './template';
import './style.scss';
import { compile } from 'pug';

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

export class UserList extends Block<TPropsUserList> {
  props: TPropsUserList;

  constructor(props: TPropsUserList) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplUserList);
    const html = compiled(this.props);
    return html;
  }
}
