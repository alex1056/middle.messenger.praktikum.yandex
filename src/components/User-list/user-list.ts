import { Block } from '../Block';
// import { Btn } from "../Button";
// import { ChatsList } from "../Chats-list";
// import { Msgs } from "../Msgs";

import { tmplUserList } from './template';
import './style.scss';

const pug = require('pug');

type TProps = { [propName: string]: any };

export class UserList extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = pug.compile(tmplUserList);
    const html = compiled(this.props);
    return html;
  }
}
