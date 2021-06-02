// import { compile } from 'pug';
import { Block } from '../Block';
// import { tmplFeedMsg } from './template';
// @ts-ignore
import template from './template.pug';

type TProps =
  | {
      data: Object;
      [propName: string]: any;
    }
  | {};

export class FeedMsg extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', props);
  }

  render(): string {
    // const compiled = compile(tmplFeedMsg);
    const html = template(this.props);
    return html;
  }
}
