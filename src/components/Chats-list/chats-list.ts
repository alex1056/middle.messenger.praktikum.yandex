import { Block } from '../Block';
import { UserList } from '../User-list';
import { tmplChatsList } from './template';
import { localsIndexPage } from '../../Locals';
// import "./style.scss";
const pug = require('pug');

type TProps = { [propName: string]: any };

export class ChatsList extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      userList: new UserList({ ...props, ...localsIndexPage }),
    });
  }

  render(): string {
    const compiled = pug.compile(tmplChatsList);
    const html = compiled({
      ...localsIndexPage,
      userList: this.props.userList.render(),
    });
    return html;
  }
}
