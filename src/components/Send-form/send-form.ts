import { Block } from '../Block';
// import { Btn } from "../Button";
import { tmplSendForm } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class SendForm extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplSendForm);
    const html = compiled({});
    return html;
  }
}
