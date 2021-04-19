import { Block } from '../Block';
import { btnTmpl } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class Btn extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render() {
    const compiled = compile(btnTmpl);
    const html = compiled(this.props);
    return html;
  }
}
