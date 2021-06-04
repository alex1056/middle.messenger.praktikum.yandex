import { Block } from '../Block';
import './style.scss';
// @ts-ignore
import template from './template.pug';

type TProps =
  | {
      buttonText?: string;
      className?: string;
      disabled?: boolean;
      buttonId?: string;
      type?: string;
      events?: { [x: string]: any };
      restProps?: {
        [x: string]: any;
      };
    }
  | undefined;

export class Btn extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
    super('div', props);
  }

  render() {
    const html = template(this.props);
    return html;
  }
}
