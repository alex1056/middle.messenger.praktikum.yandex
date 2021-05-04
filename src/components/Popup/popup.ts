// import { compile } from 'pug';
import { Block } from '../Block';
// import { Btn } from '../Button';
// import { tmplPopupChngAvatar } from './template';
// interface TPopupBase {
//   [propName: string]: any
// }

type TProps = { [propName: string]: any };

// export class Popup<> extends Block<TProps> {
export class Popup<TPopupBase> extends Block<TProps> {
  props: TPopupBase;

  constructor(props: TPopupBase) {
    super('div', props);
  }

  addEvents(): boolean {
    // const popupAddUser = document.body.querySelector<HTMLElement>('#popup-add-user');
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }
    return true;
  }

  outsideClick = (event: any) => {
    // const popupAddUser = document.body.querySelector<HTMLElement>('#popup-add-user');
    const popup = this._element;
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
  };

  render(): string {
    // const compiled = compile(tmplPopupChngAvatar);
    // const html = compiled({
    //   ...this.props,
    //   buttonChange: this.props.buttonChange.render(),
    // });
    // return html;
    return '';
  }
}
