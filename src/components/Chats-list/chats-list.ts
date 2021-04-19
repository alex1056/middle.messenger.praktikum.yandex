import { Block } from '../Block';
import { UserList } from '../User-list';
import { tmplChatsList } from './template';
import { localsIndexPage } from '../../locals';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class ChatsList extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      userList: new UserList({ ...props, ...localsIndexPage }),
    });
  }

  render(): string {
    const compiled = compile(tmplChatsList);
    const html = compiled({
      ...localsIndexPage,
      userList: this.props.userList.render(),
    });
    return html;
  }
}
