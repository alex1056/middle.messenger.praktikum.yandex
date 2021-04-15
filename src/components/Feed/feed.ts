import { Block } from '../Block';
// import { Btn } from "../Button";
// import { ProfileFormCtrls } from "../Profile-form-ctrls";
import { tmplFeed } from './template';
import './style.scss';

const pug = require('pug');

type TProps = { [propName: string]: any };

export class Feed extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render(): string {
    // console.log({ ...this.props });
    const compiled = pug.compile(tmplFeed);
    const html = compiled(this.props);
    return html;
  }
}
