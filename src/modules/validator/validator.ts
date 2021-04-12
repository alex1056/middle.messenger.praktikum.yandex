const validator = require("validator");
import { validationTextErrors } from "./constants";

type Nullable<T> = T | null;

export class Validator {
  form: Nullable<HTMLFormElement>;
  submit: Nullable<HTMLDivElement>;
  inputs: HTMLInputElement[];

  constructor(formEl: HTMLFormElement) {
    this.form = formEl;
    if (this.form) {
      this.submit = this.form.querySelector("#submit");
      this.inputs = Array.from(this.form.elements) as HTMLInputElement[];
    } else {
      throw new Error("Не найдена форма на странице");
    }
  }

  validateForm(event: any) {
    event.preventDefault();
    let isValidForm = true;
    this.inputs.forEach((elem: HTMLInputElement) => {
      if (this.submit) {
        if (elem.id && elem.id !== this.submit.id) {
          if (!this.validateInputElement(elem)) {
            isValidForm = false;
          }
        }
      } else {
        isValidForm = false;
        console.log("Отсутствует submit");
      }
    });
    return isValidForm;
  }

  validateInputElement(element: HTMLInputElement): boolean {
    const errorElement: Nullable<HTMLDivElement> = document.querySelector(
      `#error${element.id}`
    );
    if (!errorElement) {
      throw new Error("Отсутствуют поля для вывода информации о валидации");
    }
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
