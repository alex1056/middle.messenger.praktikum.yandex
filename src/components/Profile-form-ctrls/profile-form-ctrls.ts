import { Block } from '../Block';
import { tmplProfileCtrls } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = {
  [propName: string]: any;
};

export class ProfileFormCtrls extends Block<TProps> {
  props: TProps;

  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    const compiled = compile(tmplProfileCtrls);
    const html = compiled(this.props);
    return html;
  }
}
