// import { compile } from 'pug';
import { Block } from '../Block';
// import { tmplUserMenu } from './template';
// @ts-ignore
import template from './template.pug';
import './style.scss';
import { createStore, Actions } from '../../modules/Store';

type TProps = { [propName: string]: any };
const store = createStore();

export class PopupUserMenu extends Block<TProps> {
  props: TProps;

  static _instance: PopupUserMenu;

  constructor(props: TProps) {
    super('div', props);
    if (PopupUserMenu._instance) {
      return PopupUserMenu._instance;
    }

    PopupUserMenu._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
      const addUserBtn = popup.querySelector<HTMLElement>('#menu-add-user-btn');
      const deleteUserBtn = popup.querySelector<HTMLElement>('#menu-delete-user-btn');
      addUserBtn?.addEventListener('click', this.handleClick);
      deleteUserBtn?.addEventListener('click', this.handleClick);
    }

    return true;
  }

  handleClick(event: any) {
    if (event.target.id === 'menu-add-user-btn') {
      store.dispatch({
        type: Actions.USER_MENU_POPUP_SHOW,
        data: { showPopup: false },
      });
      store.dispatch({
        type: Actions.ADD_USER_POPUP_SHOW,
        data: { showPopup: true },
      });
    }
    if (event.target.id === 'menu-delete-user-btn') {
      store.dispatch({
        type: Actions.USER_MENU_POPUP_SHOW,
        data: { showPopup: false },
      });
      store.dispatch({
        type: Actions.DELETE_USER_FROM_CHAT,
        data: { showPopup: true },
      });
    }
  }

  outsideClick(event: any) {
    const popup = PopupUserMenu._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
          popup.removeEventListener('click', this.outsideClick);
          store.dispatch({
            type: Actions.USER_MENU_POPUP_SHOW,
            data: { showPopup: false },
          });
        }
      }
    }
    if (event.key === 'Escape') {
      if (popup) {
        popup.classList.add('hidden');
        document.removeEventListener('keydown', this.outsideClick);
        store.dispatch({
          type: Actions.USER_MENU_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
  }

  render(): string {
    // const compiled = compile(tmplUserMenu);
    const html = template(this.props);
    return html;
  }
}
