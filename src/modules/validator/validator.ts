const validator = require("validator");
import { validationTextErrors } from "./constants";

type Nullable<T> = T | null;

export class Validator {
  private form: Nullable<HTMLFormElement>;
  private submit: Nullable<HTMLDivElement>;
  private inputs: HTMLInputElement[];
  private handleLabels: boolean;
  //

  constructor(formEl: HTMLFormElement) {
    this.form = formEl;
    this.handleLabels = false;
    if (this.form) {
      this.submit = this.form.querySelector("#submit");
      this.inputs = Array.from(this.form.elements) as HTMLInputElement[];
    } else {
      throw new Error("Не найдена форма на странице");
    }
  }
  public setHandleLabels(handleLabels: boolean) {
    this.handleLabels = handleLabels;
  }

  private finalCheck() {
    let flag = true;
    this.inputs.forEach((elem: HTMLInputElement) => {
      if (elem.id && elem.id !== "submit") {
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

    if (event.type === "submit") {
      flag = this.finalCheck();

      if (!flag) {
        isValidForm = false;
        flag = true;
      } else {
        isValidForm = true;
      }
    } else {
      this.inputs.forEach((elem: HTMLInputElement) => {
        if (event.target.id === elem.id && event.target.id !== "submit") {
          if (!this.validateInputElement(elem)) {
            isValidForm = false;
          } else {
            flag = true;
            this.inputs.forEach((elem: HTMLInputElement) => {
              if (elem.id !== "submit") {
                if (!elem.value) {
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
    const errorElement: Nullable<HTMLDivElement> = document.querySelector(
      `#error${element.id}`
    );
    if (!errorElement) {
      throw new Error("Отсутствуют поля для вывода информации о валидации");
    }

    if (this.handleLabels) {
      if (element.value.length) {
        const labelElement: Nullable<HTMLDivElement> = document.querySelector(
          `#label${element.id}`
        );
        if (!labelElement) {
          throw new Error("Отсутствуют label");
        } else {
          labelElement.classList.remove("login-form__label_hide");
        }
      } else {
        const labelElement = document.querySelector(`#label${element.id}`);
        if (!labelElement) {
          throw new Error("Отсутствуют label");
        } else {
          labelElement.classList.add("login-form__label_hide");
        }
      }
    }

    if (element.id === "passwordconfirm") {
      const pwdInput1 = document.querySelector(`#password`) as HTMLInputElement;
      const pwdNew = document.querySelector(`#newpassword`) as HTMLInputElement;

      if (pwdNew && pwdInput1) {
        if (pwdNew.value !== element.value) {
          errorElement.textContent = validationTextErrors.pwdsDontMatch;
          return false;
        }
      } else if (pwdInput1) {
        if (pwdInput1.value !== element.value) {
          errorElement.textContent = validationTextErrors.pwdsDontMatch;
          return false;
        }
      }
    }

    if (element.type !== "email" && !element.value.length) {
      errorElement.textContent = validationTextErrors.validationLenght;
      return false;
    }
    if (element.type === "email") {
      if (!validator.isEmail(element.value)) {
        errorElement.textContent = validationTextErrors.validationEmailPresent;
        return false;
      }
    } else if (element.value.length < 2 || element.value.length > 30) {
      errorElement.textContent = validationTextErrors.validationLenght;
      return false;
    }
    errorElement.textContent = "";
    return true;
  }
}