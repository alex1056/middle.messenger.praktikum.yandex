import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import './style.scss';

type TProps = { [propName: string]: any };

export class PopupChngAvatar extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonChange: new Btn({
        buttonText: 'Поменять',
        buttonId: 'chng-avatar-btn-popup-form-profile',
        className: 'chng-avatar-popup__btn-submit btn_disabled',
        disabled: true,
      }),
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
