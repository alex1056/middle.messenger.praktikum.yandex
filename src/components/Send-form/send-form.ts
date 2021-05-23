import { compile } from 'pug';
import { Block } from '../Block';
import { tmplSendForm } from './template';

type TProps = { [propName: string]: any } | {};

export class SendForm extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    // console.log('Send-form', { ...this.props });
    const compiled = compile(tmplSendForm);
    const html = compiled({});
    return html;
  }
}
