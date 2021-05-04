import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import './style.scss';
import { createStore, Actions } from '../../modules/Store';

type TProps = { [propName: string]: any };
const store = createStore();

export class PopupChngAvatar extends Block<TProps> {
  props: TProps;

  static _instance: PopupChngAvatar;

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
    if (PopupChngAvatar._instance) {
      return PopupChngAvatar._instance;
    }

    PopupChngAvatar._instance = this;
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
    const popup = PopupChngAvatar._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.style.display = 'none';
          popup.removeEventListener('click', this.outsideClick);
        }
      }
    }
    if (event.key === 'Escape') {
      if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
      }
    }
    store.dispatch({
      type: Actions.CHNG_AVATAR_POPUP_SHOW,
      data: { showPopup: false },
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
