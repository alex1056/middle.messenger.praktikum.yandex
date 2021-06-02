// import { compile } from 'pug';
import { Block } from '../Block';
// import { tmplFeed } from './template';
import './style.scss';
// @ts-ignore
import template from './template.pug';

type TProps =
  | {
      feed: Object;
      [propName: string]: any;
    }
  | {};

export class Feed extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    // const compiled = compile(tmplFeed);
    const html = template(this.props);
    return html;
  }
}
