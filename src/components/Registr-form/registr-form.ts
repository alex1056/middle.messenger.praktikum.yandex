import { compile } from 'pug';
import { Router } from '../../modules/Router';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplRegistr } from './template';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import './style.scss';
import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';
import { Api } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';

const api = new Api();
const store = createStore();
const router = new Router('.page');

type TProps = {
  [propName: string]: any;
};

export class RegistrForm extends Block<TProps> {
  props: TProps;

  form: Form;

  constructor(props?: TProps) {
    super('div', {
      buttonsubmit: new Btn({
        ...props,
        buttonText: 'Зарегистрироваться',
        className: 'btn_disabled',
        buttonId: 'submit-form-registr',
        disabled: true,
      }),
    });
  }

  onSubmitHandlerLogin(event: any, form: HTMLFormElement, formId: string) {
    event.preventDefault();

    const errServerReply = document.body.querySelector(`#${formId}`) as HTMLFormElement;
    const errSpan = errServerReply.querySelector('#error-server-reply');
    const inputsData = onSubmitGetFormData(form, formId) as any;

    const inputsDataMapped = mapInputsForSending(inputsData, formId);

    api.logOut().then(() => {
      store.dispatch({
        type: Actions.LOGOUT_CLEAN_DATA,
        data: {},
      });
      api.signUp({ data: inputsDataMapped }).then((res: any) => {
        if (res.ok) {
          api.getUserData().then((res1: any) => {
            const userData = res1.json();
            store.dispatch({
              type: Actions.GET_USER_DATA,
              data: userData,
            });
            if (errSpan) {
              errSpan.textContent = '';
            }
            window.location.href = '/';
          });
        } else if (errSpan) {
          errSpan.textContent = res.errorMessageText as string;
        }
      });
    });
  }

  addEvents(): boolean {
    this.form = new Form('form-registr');
    this.form.setPopup(this._element as HTMLDivElement);
    this.form.setHandlers('submit', this.onSubmitHandlerLogin);
    this.form.setEventListeners();
    let currentForm = null;
    let formValidator = null;
    if (this._element) {
      currentForm = this._element.querySelector('#form-registr') as HTMLFormElement;
    }
    if (currentForm) {
      formValidator = new Validator(currentForm, 'form-registr');
    }
    if (formValidator) {
      formValidator.setHandleLabels(true);
    }
    this.form.setFormValidator(formValidator as any);

    if (this._element) {
      const loginBtnRedirect = this._element.querySelector('#registr-btn-redirect-login-form') as HTMLFormElement;

      if (loginBtnRedirect) {
        loginBtnRedirect.addEventListener('click', this.goLoginForm);
      }
    }

    return true;
  }

  goLoginForm() {
    router.go({ redirect: true }, '', '/login');
  }

  componentDidUpdate() {
    if (this.form) {
      this.form.removeEventListeners();
    }
    return true;
  }

  render(): string {
    const compiled = compile(tmplRegistr);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
