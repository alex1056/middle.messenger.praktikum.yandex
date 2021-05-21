import { sanitize } from '../../utils/sanitizeHtml';

type Nullable<T> = T | null;

export default class Form {
  private validateForm: Function;

  private validateInputElement: Function;

  private handlerFormOpen: Function;

  private form: HTMLFormElement;

  private submit: HTMLButtonElement;

  private popup: HTMLDivElement;

  private handlers: { [handlerName: string]: Function[] };

  private formId: string;

  constructor(formId: string) {
    this.handlers = {};
    if (!formId) {
      throw new Error('Не задан formId для валидации!');
    }
    this.formId = formId;
  }

  setFormValidator(validator: { validateForm(): boolean; validateInputElement(): boolean }) {
    this.validateForm = validator.validateForm.bind(validator);
    this.validateInputElement = validator.validateInputElement.bind(validator);
  }

  setHandlers(handlerName: string, callback: Function) {
    if (!this.handlers[handlerName]) {
      this.handlers[handlerName] = [];
    }
    this.handlers[handlerName].push(callback);
  }

  setPopup(popupElem: HTMLDivElement) {
    this.popup = popupElem;
    this.form = popupElem.querySelector(`#${this.formId}`) as HTMLFormElement;
    this.submit = popupElem.querySelector(`#${this.formId} #submit-${this.formId}`) as HTMLButtonElement;
  }

  getForm() {
    if (this.form) {
      return this.form;
    }
    return null;
  }

  getSubmitBtn() {
    if (this.submit) {
      return this.submit;
    }
    return null;
  }

  setEventListeners() {
    this.handlerFormOpen = this.formHandler.bind(this);

    const form: Nullable<HTMLFormElement> = this.popup.querySelector(`#${this.formId}`);
    if (form) {
      const inputs = Array.from(form.elements);
      inputs.forEach((elem) => {
        if (elem.id !== `submit-${this.formId}`) {
          elem.addEventListener(
            'focus',
            this.handlerFormOpen as EventListener, // eslint-disable-line no-undef
            //  true
          );
          elem.addEventListener(
            'blur',
            this.handlerFormOpen as EventListener, // eslint-disable-line no-undef
            //  true
          );
        }
      });

      form.addEventListener(
        'submit',
        this.handlerFormOpen as EventListener, // eslint-disable-line no-undef
        // true
      );
    }
  }

  removeEventListeners() {
    const form = this.popup.querySelector(`#${this.formId}`) as HTMLFormElement;
    if (form) {
      const inputs = Array.from(form.elements) as HTMLInputElement[];
      inputs.forEach((elem) => {
        elem.removeEventListener('focus', this.handlerFormOpen as EventListener); // eslint-disable-line no-undef
        elem.removeEventListener('blur', this.handlerFormOpen as EventListener); // eslint-disable-line no-undef
      });
      form.removeEventListener('submit', this.handlerFormOpen as EventListener); // eslint-disable-line no-undef
    }
  }

  renderButton(isValidForm: boolean) {
    if (!isValidForm) {
      this.submit.classList.add('btn_disabled');
      this.submit.setAttribute('disabled', 'disabled');
    } else {
      this.submit.classList.remove('btn_disabled');
      this.submit.removeAttribute('disabled');
    }
  }

  formHandler(event: any): void {
    const isValidForm = this.validateForm(event);
    this.renderButton(isValidForm);
    if (event.type === 'submit') {
      if (this.handlers.submit) {
        this.handlers.submit.forEach((callback) => {
          callback(event, this.form, this.formId);
        });
      }
    }
  }

  getFormData() {
    const inputs = Array.from(this.form.elements);
    const submit = this.form.querySelector(`#${this.formId}`) as HTMLDivElement;

    const inputsData = inputs.reduce((acc, item: HTMLInputElement) => {
      const { id, value } = item;
      if (id && id !== submit.id) {
        return { ...acc, [id]: sanitize(value) };
      }
      return acc;
    }, {});
    return inputsData;
  }
}
