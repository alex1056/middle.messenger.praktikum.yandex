import { compile } from 'pug';
import { Block } from '../Block';
import { tmpl404 } from './template';

type TProps = {};

export class Page404 extends Block<TProps> {
  props: TProps;

  constructor() {
    super('div', {});
  }

  render(): string {
    const compiled = compile(tmpl404);
    const html = compiled();
    return html;
  }
}
