import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class PopupChngAvatar extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonChange: new Btn({ buttonText: 'Поменять' }),
    });
  }

  render(): string {
    const compiled = compile(tmplPopupChngAvatar);
    const html = compiled({
      ...this.props,
      buttonChange: this.props.buttonChange.render(),
    });
    return html;
  }
}
