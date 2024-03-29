import { compile } from 'pug';
import { Block } from '../Block';
import { tmplAddMedia } from './template';
// import './style.scss';
import { createStore, Actions } from '../../modules/Store';

type TProps = { [propName: string]: any };
const store = createStore();

export class PopupAddMedia extends Block<TProps> {
  props: TProps;

  static _instance: PopupAddMedia;

  constructor(props: TProps) {
    super('div', props);
    if (PopupAddMedia._instance) {
      return PopupAddMedia._instance;
    }

    PopupAddMedia._instance = this;
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
    const popup = PopupAddMedia._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
          popup.removeEventListener('click', this.outsideClick);
          store.dispatch({
            type: Actions.ADD_MEDIA_POPUP_SHOW,
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
          type: Actions.ADD_MEDIA_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
  }

  render(): string {
    const compiled = compile(tmplAddMedia);
    const html = compiled(this.props);
    return html;
  }
}
