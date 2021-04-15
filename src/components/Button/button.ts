import { Block } from '../Block';
import { btnTmpl } from './template';
import './style.scss';

const pug = require('pug');

type TProps = { [propName: string]: any }

export class Btn extends Block {
  props: TProps

  constructor(props?: TProps) {
    super('div', props);
  }

  render() {
    const compiled = pug.compile(btnTmpl);
    const html = compiled(this.props);
    return html;
  }
}
