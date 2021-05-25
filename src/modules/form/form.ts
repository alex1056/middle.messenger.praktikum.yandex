type Nullable<T> = T | null

export default class Form {
  private validateForm: Function

  private validateInputElement: Function

  private handlerFormOpen: Function

  private form: HTMLFormElement

  private submit: HTMLButtonElement

  private popup: HTMLDivElement

  private handlers: { [handlerName: string]: Function[] }

  constructor() {
    this.handlers = {};
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
    this.form = popupElem.querySelector('#form') as HTMLFormElement;
    this.submit = popupElem.querySelector('#submit') as HTMLButtonElement;
  }

  setEventListeners() {
    this.handlerFormOpen = this.formHandler.bind(this);
    const form: Nullable<HTMLFormElement> = this.popup.querySelector('#form');
    if (form) {
      const inputs = Array.from(form.elements);
      inputs.forEach((elem) => {
        if (elem.id !== 'submit') {
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
    const form = this.popup.querySelector('#form') as HTMLFormElement;
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
          callback(this.form);
        });
      }
    }
  }

  getFormData() {
    const inputs = Array.from(this.form.elements);
    const submit = this.form.querySelector('#submit') as HTMLDivElement;

    const inputsData = inputs.reduce((acc, item: HTMLInputElement) => {
      const { id, value } = item;
      if (id && id !== submit.id) {
        return { ...acc, [id]: value };
      }
      return acc;
    }, {});

    return inputsData;
  }
}
