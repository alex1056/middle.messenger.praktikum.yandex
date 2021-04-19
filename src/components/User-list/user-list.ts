import { Block } from '../Block';
import { tmplUserList } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class UserList extends Block {
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
