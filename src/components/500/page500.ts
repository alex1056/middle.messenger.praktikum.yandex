import { Block } from '../Block';
import { tmpl500 } from './template';
import { compile } from 'pug';

type TProps = {};

export class Page500 extends Block<TProps> {
  props: TProps;

  constructor(props: TProps) {
    super('div', (props = {}));
  }

  render(): string {
    const compiled = compile(tmpl500);
    const html = compiled();
    return html;
  }
}
