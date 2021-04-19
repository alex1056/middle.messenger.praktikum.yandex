import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplDeleteAddUser } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class PopupDeleteUser extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        // disabled: true,
      }),
      buttonAdd: new Btn({
        buttonText: 'Удалить',
        className: 'popup__btn btn_small',
        disabled: false,
      }),
    });
  }

  render(): string {
    const compiled = compile(tmplDeleteAddUser);
    const html = compiled({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
