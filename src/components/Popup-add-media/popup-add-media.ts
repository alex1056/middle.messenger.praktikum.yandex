import { Block } from '../Block';
import { tmplAddMedia } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class PopupAddMedia extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplAddMedia);
    const html = compiled(this.props);
    return html;
  }
}
