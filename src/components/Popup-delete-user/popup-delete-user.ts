import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplDeleteAddUser } from './template';
import './style.scss';
import { createStore, Actions } from '../../modules/Store';
import { Api } from '../../modules/Api';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';

type TProps = { [propName: string]: any };
const store = createStore();
const api = new Api();

export class PopupDeleteUser extends Block<TProps> {
  props: TProps;

  form: Form;

  static _instance: PopupDeleteUser;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        buttonId: 'cancel-delete-user-form',
        type: 'button',
      }),
      buttonAdd: new Btn({
        buttonText: 'Удалить',
        className: 'popup__btn btn_small btn_disabled',
        disabled: true,
        type: 'submit',
        buttonId: 'submit-delete-user-form',
      }),
    });
    if (PopupDeleteUser._instance) {
      return PopupDeleteUser._instance;
    }

    PopupDeleteUser._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;

    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
    }

    this.form = new Form('delete-user-form');
    this.form.setPopup(this._element as HTMLDivElement);
    this.form.setHandlers('submit', this.onSubmitHandlerDeleteUser);
    this.form.setEventListeners();
    let currentForm = null;
    let formValidator = null;
    if (this._element) {
      currentForm = this._element.querySelector('#delete-user-form') as HTMLFormElement;
    }
    if (currentForm) {
      formValidator = new Validator(currentForm, 'delete-user-form');
    }
    if (formValidator) {
      formValidator.setHandleLabels(true);
    }
    this.form.setFormValidator(formValidator as any);

    const cancelBtn = this._element?.querySelector<HTMLButtonElement>('#cancel-popup-delete-user-form');
    cancelBtn?.addEventListener('click', this.onCancelHandlerDeleteUser);

    return true;
  }

  onSubmitHandlerDeleteUser(event: any, form: HTMLFormElement, formId: string) {
    event.preventDefault();
    const inputsData = onSubmitGetFormData(form, formId);
    const formData = mapInputsForSending(inputsData, formId) as { userLogin: string };
    const errSpan = document.querySelector('#delete-user-popup #erroruserlogin-delete-user-form');
    const { activeChatId } = store.getState();
    api.getChatUsers(activeChatId).then((res: any) => {
      if (res.ok) {
        const resArr = res.json() as Array<{ [propName: string]: any; login: string }>;
        const arrFiltered = resArr.filter((item) => {
          if (formData.userLogin === item.login) {
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
          api.deleteUsersFromChat(users, activeChatId).then((res1: any) => {
            if (res1.ok && errSpan) {
              errSpan.textContent = `${formData.userLogin} удален из чата`;
            }
          });
        } else {
          const { reason } = res.json();

          if (errSpan) {
            errSpan.textContent = `${reason}`;
          }
        }
      }
    });
  }

  onCancelHandlerDeleteUser(event: any) {
    event.preventDefault();
    store.dispatch({
      type: Actions.DELETE_USER_FROM_CHAT,
      data: { showPopup: false },
    });
  }

  outsideClick(event: any) {
    const popup = PopupDeleteUser._instance._element;

    if (event.key === 'Escape') {
      if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
        store.dispatch({
          type: Actions.DELETE_USER_FROM_CHAT,
          data: { showPopup: false },
        });
      }
    }
    if (event.type === 'click') {
      if (popup) {
        if (
          popup === event.target ||
          event.target.id === 'cancel-delete-user-form' ||
          event.target.textContent === 'Отмена'
        ) {
          store.dispatch({
            type: Actions.DELETE_USER_FROM_CHAT,
            data: { showPopup: false },
          });
        }
      }
    }
  }

  render(): string {
    const compiled = compile(tmplDeleteAddUser);
    const html = compiled({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
