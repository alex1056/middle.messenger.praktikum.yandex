import { compile } from 'pug';
import { Block } from '../Block';
import { tmplSendForm } from './template';
import './style.scss';

type TProps = { [propName: string]: any } | {};

export class SendForm extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplSendForm);
    const html = compiled({});
    return html;
  }
}
