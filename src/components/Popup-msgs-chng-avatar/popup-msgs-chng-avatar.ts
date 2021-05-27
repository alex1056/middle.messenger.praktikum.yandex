import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplPopupChngAvatar } from './template';
import { Form } from '../../modules/form';
import { Api } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';
import { transfromChatsData } from '../../utils/transfrom-chats-data';
import './style.scss';

type TProps = { [propName: string]: any };
const api = new Api();
const store = createStore();

export class PopupMsgsChngAvatar extends Block<TProps> {
  props: TProps;

  form: Form;

  files: FileList;

  static _instance: PopupMsgsChngAvatar;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonChange: new Btn({
        buttonText: 'Поменять',
        buttonId: 'submit-form-msgs-chng-avatar',
        className: 'chng-avatar-popup__btn-submit btn_disabled',
        disabled: true,
      }),
    });

    if (PopupMsgsChngAvatar._instance) {
      return PopupMsgsChngAvatar._instance;
    }

    PopupMsgsChngAvatar._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
      const form = popup.querySelector('#form-msgs-chng-avatar');
      const uploadInput = form?.querySelector('#uploadInput-form-msgs-chng-avatar');
      uploadInput?.addEventListener('change', this.handleFileUpload);
      form?.addEventListener('submit', this.handleFileSubmit);
    }

    return true;
  }

  handleFileSubmit(event: any) {
    event.preventDefault();

    const popup = document.body.querySelector('#msgs-chng-avatar-popup');
    const formNode = popup?.querySelector<HTMLFormElement>('#form-msgs-chng-avatar');

    if (formNode) {
      const formData = new FormData();
      const uploadInput = formNode?.querySelector('#uploadInput-form-msgs-chng-avatar') as HTMLInputElement;
      if (uploadInput) {
        const file = uploadInput?.files?.[0] as string | Blob;
        const { activeChatId } = store.getState();
        formData.append('avatar', file, 'my-file-name');
        formData.append('chatId', activeChatId);

        api.chngChatAvatar({ form: formData }).then((res: any) => {
          console.log(res.json());
          if (res.ok) {
            api.getChats().then((res1: any) => {
              const chatsDataReply = res1.json() as any;
              const chatsDataChanged = transfromChatsData(chatsDataReply);

              store.dispatch({
                type: Actions.CHATS_UPDATE,
                data: chatsDataChanged,
              });
            });

            store.dispatch({
              type: Actions.MSGS_CHNG_AVATAR_POPUP_SHOW,
              data: { showPopup: false },
            });
          } else {
            console.log(res.errorMessageText);
          }
        });
      }
    }
  }

  handleFileUpload(event: any) {
    event.preventDefault();
    const form = document.querySelector('#form-msgs-chng-avatar');
    const fileList = this.files;
    if (fileList[0]) {
      const fName = form?.querySelector<HTMLElement>('#uploadedfile-form-msgs-chng-avatar');
      const inputLabel = form?.querySelector<HTMLElement>('#labelavatar-form-msgs-chng-avatar');
      const submitBtn = form?.querySelector<HTMLButtonElement>('#submit-form-msgs-chng-avatar');

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
    const popup = PopupMsgsChngAvatar._instance._element;

    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
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
        popup.classList.add('hidden');
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
