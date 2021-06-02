// import { compile } from 'pug';
// @ts-ignore
import template from './template.pug';
import { Block } from '../Block';
// import { tmpl500 } from './template';

type TProps = {};

export class Page500 extends Block<TProps> {
  props: TProps;

  constructor() {
    super('div', {});
  }

  render(): string {
    // const compiled = compile(tmpl500);
    const html = template();
    return html;
  }
}
