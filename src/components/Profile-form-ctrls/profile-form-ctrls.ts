import { Block } from '../Block';
import './style.scss';

// @ts-ignore
import template from './template.pug';

type TProps = {
  [propName: string]: any;
};

export class ProfileFormCtrls extends Block<TProps> {
  props: TProps;

  constructor(props: TProps) {
    super('div', props);
  }

  render(): string {
    const html = template(this.props);
    return html;
  }
}
