import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupAddUser } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class PopupAddUser extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
      }),
      buttonAdd: new Btn({
        buttonText: 'Добавить',
        className: 'popup__btn btn_small btn_disabled',
        disabled: true,
      }),
    });
  }

  render(): string {
    const compiled = compile(tmplPopupAddUser);
    const html = compiled({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
