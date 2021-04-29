import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplLogin } from './template';
import './style.scss';
import { onSubmitHandlerLogin } from '../../modules/form/onSubmitHandlers';

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

  addEvents(): boolean {
    this.form = new Form('form-login');
    this.form.setPopup(this._element as HTMLDivElement);
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
    this.form.setHandlers('submit', onSubmitHandlerLogin);
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
