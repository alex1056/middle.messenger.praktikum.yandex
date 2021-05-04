import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplDeleteAddUser } from './template';
import './style.scss';
import { createStore, Actions } from '../../modules/Store';

type TProps = { [propName: string]: any };
const store = createStore();

export class PopupDeleteUser extends Block<TProps> {
  props: TProps;

  static _instance: PopupDeleteUser;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        buttonId: 'delete-user-cancel-btn',
        // disabled: true,
      }),
      buttonAdd: new Btn({
        buttonText: 'Удалить',
        className: 'popup__btn btn_small',
        disabled: false,
      }),
    });
    if (PopupDeleteUser._instance) {
      return PopupDeleteUser._instance;
    }

    PopupDeleteUser._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;

    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }
    return true;
  }

  outsideClick(event: any) {
    const popup = PopupDeleteUser._instance._element;

    if (event.key === 'Escape') {
      if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
      }
    }
    if (event.type === 'click') {
      if (popup) {
        if (
          popup === event.target ||
          event.target.id === 'delete-user-cancel-btn' ||
          event.target.classList.contains('btn__text')
        ) {
          store.dispatch({
            type: Actions.DELETE_USER_FROM_CHAT,
            data: { showPopup: false },
          });
        }
      }
    }
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
