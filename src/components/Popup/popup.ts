import { Block } from '../Block';

type TProps = { [propName: string]: any };

export class Popup<TPopupBase> extends Block<TProps> {
  props: TPopupBase;

  constructor(props: TPopupBase) {
    super('div', props);
  }

  addEvents(): boolean {
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }
    return true;
  }

  outsideClick = (event: any) => {
    const popup = this._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
          popup.removeEventListener('click', this.outsideClick);
        }
      }
    }
    if (event.key === 'Escape') {
      if (popup) {
        popup.classList.add('hidden');
        document.removeEventListener('keydown', this.outsideClick);
      }
    }
  };

  render(): string {
    return '';
  }
}
