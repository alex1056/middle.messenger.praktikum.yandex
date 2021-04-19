import { Block } from '../Block';
import { tmpl500 } from './template';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class Page500 extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmpl500);
    const html = compiled({});
    return html;
  }
}
