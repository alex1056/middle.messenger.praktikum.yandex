import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplRegistr } from './template';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import './style.scss';
import { onSubmitHandlerLogin } from '../../modules/form/onSubmitHandlers';
import { getEventBus } from '../../modules/EventBusInstance';

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
    // this.eventBus = getEventBus();
    // const handler = () => {};

    // this.eventBus.on('test', handler);
  }

  addEvents(): boolean {
    this.form = new Form('form-registr');
    this.form.setPopup(this._element as HTMLDivElement);
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
    const compiled = compile(tmplRegistr);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
