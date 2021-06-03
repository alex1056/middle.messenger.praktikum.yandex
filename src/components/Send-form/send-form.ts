import { Block } from '../Block';
// import { tmplSendForm } from './template';
// @ts-ignore
const template = require('./template.pug');

type TProps = { [propName: string]: any } | {};

export class SendForm extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    // const compiled = compile(tmplSendForm);
    const html = template({});
    return html;
  }
}
