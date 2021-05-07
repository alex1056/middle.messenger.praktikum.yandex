import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupAddUser } from './template';
// import './style.scss';
import { createStore, Actions } from '../../modules/Store';

type TProps = { [propName: string]: any };
const store = createStore();

export class PopupAddChat extends Block<TProps> {
  props: TProps;

  static _instance: PopupAddChat;

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
    if (PopupAddChat._instance) {
      return PopupAddChat._instance;
    }

    PopupAddChat._instance = this;
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
    const popup = PopupAddChat._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.style.display = 'none';
          popup.removeEventListener('click', this.outsideClick);
          store.dispatch({
            type: Actions.ADD_CHAT_POPUP_SHOW,
            data: { showPopup: false },
          });
        }
      }
    }
    if (event.key === 'Escape') {
      if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
        store.dispatch({
          type: Actions.ADD_CHAT_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
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
