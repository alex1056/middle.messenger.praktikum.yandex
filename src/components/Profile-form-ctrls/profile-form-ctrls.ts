// import { compile } from 'pug';
import { Block } from '../Block';
// import { tmplProfileCtrls } from './template';
// @ts-ignore
import template from './template.pug';
import './style.scss';

type TProps = {
  [propName: string]: any;
};

export class ProfileFormCtrls extends Block<TProps> {
  props: TProps;

  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    // const compiled = compile(tmplProfileCtrls);
    const html = template(this.props);
    return html;
  }
}
