import { Block } from '../Block';
import { tmplUserList } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps =
  | {
      userList: Object[];
      [propName: string]: any;
    }
  | undefined;

export class UserList extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplUserList);
    const html = compiled(this.props);
    return html;
  }
}
