import { Block } from '../Block';
import { Btn } from '../Button';
// import { tmplPopupAddChat } from './template';

import { createStore, Actions } from '../../modules/Store';
import { Api } from '../../modules/Api';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';
import './style.scss';
// @ts-ignore
const template = require('./template.pug');

type TProps = { [propName: string]: any };
const store = createStore();
const api = new Api();

export class PopupAddChat extends Block<TProps> {
  props: TProps;

  form: Form;

  static _instance: PopupAddChat;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        buttonId: 'cancel-popup-add-chat-form',
        type: 'button',
      }),
      buttonAdd: new Btn({
        buttonText: 'Добавить',
        className: 'popup__btn btn_small btn_disabled',
        buttonId: 'submit-popup-add-chat-form',
        disabled: true,
      }),
    });
    if (PopupAddChat._instance) {
      return PopupAddChat._instance;
    }

    PopupAddChat._instance = this;
  }

  onSubmitHandlerAddChat(event: any, form: HTMLFormElement, formId: string) {
    event.preventDefault();
    const inputsData = onSubmitGetFormData(form, formId);
    const formData = mapInputsForSending(inputsData, formId) as { chatName: string };
    api.createChat(formData.chatName).then((res: any) => {
      if (res.ok) {
        api.getChats().then((res1: any) => {
          const chatsData = res1.json();

          store.dispatch({
            type: Actions.CHATS_UPDATE,
            data: chatsData,
          });
        });
      } else {
        console.log(res.errorMessageText);
      }
    });
  }

  onCancelHandlerAddChat(event: any) {
    event.preventDefault();
    store.dispatch({
      type: Actions.ADD_CHAT_POPUP_SHOW,
      data: { showPopup: false },
    });
  }

  addEvents(): boolean {
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }

    this.form = new Form('popup-add-chat-form');
    this.form.setPopup(this._element as HTMLDivElement);
    this.form.setHandlers('submit', this.onSubmitHandlerAddChat);
    this.form.setEventListeners();
    let currentForm = null;
    let formValidator = null;
    if (this._element) {
      currentForm = this._element.querySelector('#popup-add-chat-form') as HTMLFormElement;
    }
    if (currentForm) {
      formValidator = new Validator(currentForm, 'popup-add-chat-form');
    }
    if (formValidator) {
      formValidator.setHandleLabels(true);
    }
    this.form.setFormValidator(formValidator as any);

    const cancelBtn = this._element?.querySelector<HTMLButtonElement>('#cancel-popup-add-chat-form');
    cancelBtn?.addEventListener('click', this.onCancelHandlerAddChat);

    return true;
  }

  outsideClick(event: any) {
    const popup = PopupAddChat._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
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
        popup.classList.add('hidden');
        document.removeEventListener('keydown', this.outsideClick);
        store.dispatch({
          type: Actions.ADD_CHAT_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
  }

  render(): string {
    // const compiled = compile(tmplPopupAddChat);
    const html = template({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
