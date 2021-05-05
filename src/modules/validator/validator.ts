import { validationTextErrors } from './constants';
import { validateEmail } from '../../utils/validate-email';

type Nullable<T> = T | null;

export class Validator {
  private form: Nullable<HTMLFormElement>;

  private submit: Nullable<HTMLDivElement>;

  private inputs: HTMLInputElement[];

  private handleLabels: boolean;

  private formId: string;

  constructor(formEl: HTMLFormElement, formId: string = '') {
    this.form = formEl;

    if (!formId) {
      throw new Error('Не задан formId для валидации!');
    }
    this.formId = formId;
    this.handleLabels = false;
    if (this.form) {
      this.submit = this.form.querySelector(`#${this.formId} #submit-${this.formId}`);

      this.inputs = Array.from(this.form.elements) as HTMLInputElement[];
    } else {
      throw new Error('Не найдена форма на странице');
    }
  }

  public setHandleLabels(handleLabels: boolean) {
    this.handleLabels = handleLabels;
  }

  private finalCheck() {
    let flag = true;
    this.inputs.forEach((elem: HTMLInputElement) => {
      if (elem.id && elem.id !== `submit-${this.formId}`) {
        if (!this.validateInputElement(elem)) {
          flag = false;
        }
      }
    });
    return flag;
  }

  validateForm(event: any) {
    event.preventDefault();
    let isValidForm = false;
    let flag = true;

    if (event.type === 'submit') {
      flag = this.finalCheck();

      if (!flag) {
        isValidForm = false;
        flag = true;
      } else {
        isValidForm = true;
      }
    } else {
      this.inputs.forEach((elem: HTMLInputElement) => {
        if (event.target.id === elem.id && event.target.id !== `submit-${this.formId}`) {
          if (!this.validateInputElement(elem)) {
            isValidForm = false;
          } else {
            flag = true;
            this.inputs.forEach((elem1: HTMLInputElement) => {
              if (elem1.id !== `submit-${this.formId}`) {
                if (!elem1.value) {
                  flag = false;
                }
              }
            });
            if (flag) {
              isValidForm = this.finalCheck();
            }
          }
        }
      });
    }
    return isValidForm;
  }

  validateInputElement(element: HTMLInputElement): boolean {
    const errorElement = document.querySelector<HTMLDivElement>(`#${this.formId} #error${element.id}`);
    if (!errorElement) {
      throw new Error('Отсутствуют поля для вывода информации о валидации');
    }

    if (this.handleLabels) {
      if (element.value.length) {
        const labelElement = document.querySelector<HTMLDivElement>(`#${this.formId} #label${element.id}`);
        if (!labelElement) {
          throw new Error('Отсутствуют label');
        } else {
          labelElement.classList.remove('login-form__label_hide');
        }
      } else {
        const labelElement = document.querySelector(`#${this.formId} #label${element.id}`);
        if (!labelElement) {
          throw new Error('Отсутствуют label');
        } else {
          labelElement.classList.add('login-form__label_hide');
        }
      }
    }

    if (element.id === `passwordconfirm-${this.formId}`) {
      const pwdOld = document.querySelector(`#${this.formId} #oldPassword-${this.formId}`) as HTMLInputElement;
      const pwdNew = document.querySelector(`#${this.formId} #newpassword-${this.formId}`) as HTMLInputElement;
      const pwd = document.querySelector(`#${this.formId} #password-${this.formId}`) as HTMLInputElement;
      // console.log(element.id, pwdNew.value);

      if (pwd && !pwdOld) {
        if (pwd.value !== element.value) {
          errorElement.textContent = validationTextErrors.pwdsDontMatch;
          return false;
        }
      }

      if (pwdNew && pwdOld) {
        if (pwdNew.value !== element.value) {
          errorElement.textContent = validationTextErrors.pwdsDontMatch;
          return false;
        }
      } else if (pwdOld) {
        if (pwdOld.value !== element.value) {
          errorElement.textContent = validationTextErrors.pwdsDontMatch;
          return false;
        }
      }
    }

    if (element.type !== 'email' && !element.value.length) {
      errorElement.textContent = validationTextErrors.validationLenght;
      return false;
    }
    if (element.type === 'email') {
      if (!validateEmail(element.value)) {
        errorElement.textContent = validationTextErrors.validationEmailPresent;
        return false;
      }
    } else if (element.value.length < 2 || element.value.length > 30) {
      errorElement.textContent = validationTextErrors.validationLenght;
      return false;
    }
    errorElement.textContent = '';
    return true;
  }
}
