// @ts-ignore
// const template = require('./template.pug');

import './styles.scss';

import { Block } from '../Block';

const template = require('./template.pug');

// require('./styles.scss');

// console.log('template=', template);
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
