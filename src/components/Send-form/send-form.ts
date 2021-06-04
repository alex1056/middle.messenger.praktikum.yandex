import { Block } from '../Block';
// @ts-ignore
import template from './template.pug';

type TProps = { [propName: string]: any } | {};

export class SendForm extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    const html = template({});
    return html;
  }
}
