import { Block } from '../Block';
import { Btn } from '../Button';
// import { tmplPopupAddUser } from './template';

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

export class PopupAddUser extends Block<TProps> {
  props: TProps;

  form: Form;

  static _instance: PopupAddUser;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        type: 'button',
        buttonId: 'cancel-popup-add-user-form',
      }),
      buttonAdd: new Btn({
        buttonText: 'Добавить',
        className: 'popup__btn btn_small btn_disabled',
        disabled: true,
        type: 'submit',
        buttonId: 'submit-popup-add-user-form',
      }),
    });
    if (PopupAddUser._instance) {
      return PopupAddUser._instance;
    }

    PopupAddUser._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;
    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }

    this.form = new Form('popup-add-user-form');
    this.form.setPopup(this._element as HTMLDivElement);
    this.form.setHandlers('submit', this.onSubmitHandlerAddUser);
    this.form.setEventListeners();
    let currentForm = null;
    let formValidator = null;
    if (this._element) {
      currentForm = this._element.querySelector('#popup-add-user-form') as HTMLFormElement;
    }
    if (currentForm) {
      formValidator = new Validator(currentForm, 'popup-add-user-form');
    }
    if (formValidator) {
      formValidator.setHandleLabels(true);
    }
    this.form.setFormValidator(formValidator as any);

    const cancelBtn = this._element?.querySelector<HTMLButtonElement>('#cancel-popup-add-user-form');
    cancelBtn?.addEventListener('click', this.onCancelHandlerAddChat);

    return true;
  }

  onSubmitHandlerAddUser(event: any, form: HTMLFormElement, formId: string) {
    event.preventDefault();
    const inputsData = onSubmitGetFormData(form, formId);
    const formData = mapInputsForSending(inputsData, formId) as { userLogin: string };
    const errSpan = document.querySelector('#add-user-popup #erroruserlogin-popup-add-user-form');
    api.findUser(formData.userLogin).then((res: any) => {
      if (res.ok) {
        const resArr = res.json() as Array<{}>;

        const arrFiltered = resArr.filter((item: any) => {
          if (item.login === formData.userLogin) {
            return true;
          }
          return false;
        });

        if (arrFiltered.length === 0) {
          if (errSpan) {
            errSpan.textContent = 'пользователь не найден';
          }
          return;
        }
        const { id } = arrFiltered[0] as any;
        if (id) {
          const users = [id];
          const { activeChatId } = store.getState();

          api.addUsersToChat(users, activeChatId).then((res1: any) => {
            if (res1.ok && errSpan) {
              errSpan.textContent = `${formData.userLogin} добавлен в чат`;
            }
          });
        } else if (errSpan) {
          errSpan.textContent = res.errorMessageText as string;
        }
      }
    });
  }

  onCancelHandlerAddChat(event: any) {
    event.preventDefault();
    store.dispatch({
      type: Actions.ADD_USER_POPUP_SHOW,
      data: { showPopup: false },
    });
  }

  outsideClick(event: any) {
    const popup = PopupAddUser._instance._element;
    if (event.type === 'click') {
      if (popup) {
        if (popup === event.target) {
          popup.classList.add('hidden');
          popup.removeEventListener('click', this.outsideClick);
          store.dispatch({
            type: Actions.ADD_USER_POPUP_SHOW,
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
          type: Actions.ADD_USER_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
  }

  render(): string {
    // const compiled = compile(tmplPopupAddUser);
    const html = template({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
