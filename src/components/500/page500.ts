import { Block } from '../Block';
// @ts-ignore
import template from './template.pug';

type TProps = {};

export class Page500 extends Block<TProps> {
  props: TProps;

  constructor() {
    super('div', {});
  }

  render(): string {
    const html = template();
    return html;
  }
}
