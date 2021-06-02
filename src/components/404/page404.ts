// import { compile } from 'pug';
// @ts-ignore
import template from './template.pug';
import { Block } from '../Block';
// import { tmpl404 } from './template';

type TProps = {};

export class Page404 extends Block<TProps> {
  props: TProps;

  constructor() {
    super('div', {});
  }

  render(): string {
    // const compiled = compile(tmpl404);
    const html = template();
    return html;
  }
}
