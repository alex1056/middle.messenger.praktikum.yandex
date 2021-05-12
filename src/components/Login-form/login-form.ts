import { compile } from 'pug';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplLogin } from './template';
import './style.scss';
import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';
import { Api } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';

const api = new Api();
const store = createStore();

type TProps = {
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  [propName: string]: any;
};

export class LoginForm extends Block<TProps> {
  form: Form;

  constructor(props?: TProps) {
    //
    super('div', {
      buttonsubmit: new Btn({
        ...props,
        buttonText: 'Аворизоваться',
        className: 'btn_disabled',
        buttonId: 'submit-form-login',
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
      api.signIn({ data: inputsDataMapped }).then((res) => {
        if (res.ok) {
          api.getUserData().then((res1) => {
            const userData = res1.json();
            store.dispatch({
              type: Actions.GET_USER_DATA,
              data: userData,
            });
            if (errSpan) {
              errSpan.textContent = '';
            }
          });
        } else if (errSpan) {
          const { reason } = res.json();
          errSpan.textContent = reason as string;
        }
      });
    });
  }

  addEvents(): boolean {
    this.form = new Form('form-login');
    this.form.setPopup(this._element as HTMLDivElement);
    this.form.setHandlers('submit', this.onSubmitHandlerLogin);
    this.form.setEventListeners();
    let currentForm = null;
    let formValidator = null;
    if (this._element) {
      currentForm = this._element.querySelector('#form-login') as HTMLFormElement;
    }
    if (currentForm) {
      formValidator = new Validator(currentForm, 'form-login');
    }
    if (formValidator) {
      formValidator.setHandleLabels(true);
    }
    this.form.setFormValidator(formValidator as any);

    return true;
  }

  componentDidUpdate() {
    if (this.form) {
      this.form.removeEventListeners();
    }
    return true;
  }

  render(): string {
    const compiled = compile(tmplLogin);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
