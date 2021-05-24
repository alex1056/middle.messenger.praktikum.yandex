import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import { Form } from '../../modules/form';
import { Api } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';
import './style.scss';

type TProps = { [propName: string]: any };
const api = new Api();
const store = createStore();

export class PopupChngAvatar extends Block<TProps> {
  props: TProps;

  form: Form;

  files: FileList;

  static _instance: PopupChngAvatar;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonChange: new Btn({
        buttonText: 'Поменять',
        buttonId: 'submit-form-chng-avatar',
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
      const form = popup.querySelector('#form-chng-avatar');
      const uploadInput = form?.querySelector('#uploadInput-form-chng-avatar');
      uploadInput?.addEventListener('change', this.handleFileUpload);
      form?.addEventListener('submit', this.handleFileSubmit);
    }

    return true;
  }

  handleFileSubmit(event: any) {
    event.preventDefault();

    const popup = document.body.querySelector('#chng-avatar-popup');
    const formNode = popup?.querySelector<HTMLFormElement>('#form-chng-avatar');

    if (formNode) {
      const formData = new FormData();
      const uploadInput = formNode?.querySelector('#uploadInput-form-chng-avatar') as HTMLInputElement;
      if (uploadInput) {
        // @ts-ignore: Object is possibly 'null'
        const file = uploadInput.files[0];
        formData.append('avatar', file, 'my-file-name');
        api.chngUserAvatar({ form: formData }).then((res: any) => {
          if (res.ok) {
            const userDataFromServer = res.json();

            store.dispatch({
              type: Actions.GET_USER_DATA,
              data: userDataFromServer,
            });
            store.dispatch({
              type: Actions.UPDATE_USER_AVATAR,
            });
            store.dispatch({
              type: Actions.CHNG_AVATAR_POPUP_SHOW,
              data: { showPopup: false },
            });
          } else {
            const { reason } = res.json();

            console.log(reason);
          }
        });
      }
    }
  }

  handleFileUpload(event: any) {
    event.preventDefault();
    const form = document.querySelector('#form-chng-avatar');
    const fileList = this.files;
    if (fileList[0]) {
      const fName = form?.querySelector<HTMLElement>('#uploadedfile-form-chng-avatar');
      const inputLabel = form?.querySelector<HTMLElement>('#labelavatar-form-chng-avatar');
      const submitBtn = form?.querySelector<HTMLButtonElement>('#submit-form-chng-avatar');

      if (fName) {
        const slicedName = fileList[0].name.split('').slice(0, 20).join('');
        fName.textContent = `${slicedName}${fileList[0].name.length > 20 ? '...' : ''}`;
        fName.style.display = 'block';
        if (inputLabel) {
          inputLabel.style.display = 'none';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn_disabled');
        }
      }
    }
  }

  outsideClick(event: any) {
    const popup = PopupChngAvatar._instance._element;

    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.style.display = 'none';
          popup.removeEventListener('click', this.outsideClick);
          store.dispatch({
            type: Actions.CHNG_AVATAR_POPUP_SHOW,
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
          type: Actions.CHNG_AVATAR_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
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
