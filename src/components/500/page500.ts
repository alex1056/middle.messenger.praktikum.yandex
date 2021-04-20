import { compile } from 'pug';
import { Block } from '../Block';
import { tmpl500 } from './template';

type TProps = {};

export class Page500 extends Block<TProps> {
  props: TProps;

  constructor() {
    super('div', {});
  }

  render(): string {
    const compiled = compile(tmpl500);
    const html = compiled();
    return html;
  }
}
