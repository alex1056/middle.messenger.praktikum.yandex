import { Block } from '../Block';
import { tmplProfileCtrls } from './template';
import './style.scss';

const pug = require('pug');

type TProps = { [propName: string]: any };

export class ProfileFormCtrls extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = pug.compile(tmplProfileCtrls);
    const html = compiled(this.props);
    return html;
  }
}
