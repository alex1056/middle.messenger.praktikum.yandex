import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import { Form } from '../../modules/form';
// import { Validator } from '../../modules/validator';
import './style.scss';
// import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';
import { Api } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';

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
      // uploadInput?.addEventListener('onchange', this.handleFile);
    }

    return true;
  }

  handleFileSubmit(event: any) {
    event.preventDefault();
    const popup = document.body.querySelector('#chng-avatar-popup');
    const formNode = popup?.querySelector<HTMLFormElement>('#form-chng-avatar');
    // const uploadInput = form?.querySelector<HTMLInputElement>('#uploadInput-form-chng-avatar');

    // const fileList = uploadInput?.files;
    if (formNode) {
      const formdata = new FormData(formNode);
      const uploadInput = formNode?.querySelector('#uploadInput-form-chng-avatar') as HTMLInputElement;
      const file = uploadInput.files[0].file;
      console.log('uploadInput.files[0]', uploadInput.files[0]);
      console.log('file', file);
      formdata.append('file', file);
      api.chngUserAvatar({ form: formdata }).then((res) => {
        if (res.ok) {
          const userDataFromServer = res.json();
          console.log(userDataFromServer);
          // if (errSpan) {
          //   errSpan.textContent = 'Изменения сохранены';
          // }
          // store.dispatch({
          //   type: Actions.GET_USER_DATA,
          //   data: userDataFromServer,
          // });
        } else {
          const { reason } = res.json();
          // errSpan.textContent = reason as string;
          console.log(reason);
        }
      });
    }

    // console.log(fileList);
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
        fName.textContent = fileList[0].name;
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
    // console.log(fileList[0]);
    // console.log(this);

    // console.log(form);
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
