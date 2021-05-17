import { compile } from 'pug';
import { Block } from '../Block';
import { tmplFeedMsg } from './template';
// import './style.scss';

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
    const compiled = compile(tmplFeedMsg);
    const html = compiled(this.props);
    return html;
  }
}
