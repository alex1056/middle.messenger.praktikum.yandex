type Nullable<T> = T | null;

export default class Form {
  private validateForm: Function;
  private validateInputElement: Function;
  private handlerFormOpen: Function;
  private form: HTMLFormElement;
  private submit: HTMLButtonElement;
  private popup: HTMLDivElement;
  private handlers: { [handlerName: string]: Function[] };

  constructor() {
    //this.handlerFormOpen = null;
    // this._sessionHandler = null;
    // this._header = null;
    this.handlers = {};
  }
  setFormValidator(validator: {
    validateForm(): boolean;
    validateInputElement(): boolean;
  }) {
    this.validateForm = validator.validateForm.bind(validator);
    this.validateInputElement = validator.validateInputElement.bind(validator);
  }
  setHandlers(handlerName: string, callback: Function) {
    if (!this.handlers[handlerName]) {
      this.handlers[handlerName] = [];
    }
    this.handlers[handlerName].push(callback);
    // console.log(this.handlers);
  }

  setPopup(popupElem: HTMLDivElement) {
    // this.popupObj = popupObj;
    this.popup = popupElem;
    this.form = popupElem.querySelector("#form") as HTMLFormElement;
    this.submit = popupElem.querySelector("#submit") as HTMLButtonElement;
  }

  // setApi(apiObj) {
  //   this._api = apiObj;
  // }

  // setSessionHandler(sessionHandler) {
  //   this._sessionHandler = sessionHandler;
  // }

  // setHeaderClass(headerObj) {
  //   this._header = headerObj;
  // }

  setEventListeners() {
    this.handlerFormOpen = this.formHandler.bind(this);
    let form: Nullable<HTMLFormElement> = this.popup.querySelector("#form");
    if (form) {
      const inputs = Array.from(form.elements);
      inputs.forEach((elem) => {
        if (elem.id !== "submit") {
          elem.addEventListener(
            "focus",
            this.handlerFormOpen as EventListener
            //  true
          );
          elem.addEventListener(
            "blur",
            this.handlerFormOpen as EventListener
            //  true
          );
        }
      });
      form.addEventListener(
        "submit",
        this.handlerFormOpen as EventListener
        // true
      );
      return;
    }
  }

  removeEventListeners() {
    let form = this.popup.querySelector("#form") as HTMLFormElement;
    if (form) {
      const inputs = Array.from(form.elements) as HTMLInputElement[];
      inputs.forEach((elem) => {
        elem.removeEventListener(
          "focus",
          this.handlerFormOpen as EventListener
        );
        elem.removeEventListener("blur", this.handlerFormOpen as EventListener);
      });
      form.removeEventListener("submit", this.handlerFormOpen as EventListener);
    }
    return;
  }

  renderButton(isValidForm: boolean) {
    if (!isValidForm) {
      this.submit.classList.add("btn_disabled");
      this.submit.setAttribute("disabled", "disabled");
    } else {
      this.submit.classList.remove("btn_disabled");
      this.submit.removeAttribute("disabled");
    }
  }

  formHandler(event: any): void {
    const isValidForm = this.validateForm(event);
    this.renderButton(isValidForm);
    if (event.type === "submit") {
      if (this.handlers.submit) {
        this.handlers.submit.forEach((callback) => {
          callback(this.form);
        });
      }
    }

    // if (event.type === "submit" && event.target.closest("#formLogin")) {
    //   if (isValidForm) {
    //     const inputEmail = this.popup.querySelector("#email");
    //     const inputPassword = this.popup.querySelector("#password");
    //     const credentials = {
    //       email: inputEmail.value,
    //       password: inputPassword.value,
    //     };
    //     this._api
    //       .login(credentials)
    //       .then((result) => {
    //         if (result === 200) {
    //           this._api
    //             .getUserData()
    //             .then((data) => {
    //               const { name } = data;
    //               this._sessionHandler.setUserName(name);
    //               const props = { isLoggedIn: true, userName: name };
    //               this._header.render(props);
    //             })
    //             .catch((err) => {
    //               console.log(err);
    //               this._showErrorMessage(err.message);
    //             });
    //         }

    //         this.removeEventListeners();
    //         this.popupObj.close();
    //         return result;
    //       })
    //       .catch((err) => {
    //         this._showErrorMessage(err.message);
    //       });
    //   }
    // }
    // if (event.type === "submit" && event.target.closest("#formRegister")) {
    //   if (isValidForm) {
    //     const inputEmail = this.popup.querySelector("#email");
    //     const inputPassword = this.popup.querySelector("#password");
    //     const inputName = this.popup.querySelector("#name");
    //     const credentials = {
    //       email: inputEmail.value,
    //       password: inputPassword.value,
    //       name: inputName.value,
    //     };
    //     this._api
    //       .signup(credentials)
    //       .then((result) => {
    //         this.removeEventListeners();
    //         this._sleep(1500);
    //         this.popupObj.clearContent();
    //         this.popupObj.setContent("popupSuccessRegistrContent");
    //         return result;
    //       })
    //       .catch((err) => {
    //         this._showErrorMessage(err.message);
    //       });
    //   }
    // }
  }

  // _sendForm() {
  //   if (this.form.id === "formLogin") {
  //     return this._api.login();
  //   }
  //   return this._sleep(1000);
  // }

  // _sleep(ms) {
  //   return new Promise((resolve) =>
  //     setTimeout(() => {
  //       resolve();
  //     }, ms)
  //   );
  // }

  // _showErrorMessage(message) {
  //   const errorElement = document.querySelector("#formerrmessage");
  //   errorElement.textContent = message;
  // }
  getFormData() {
    const inputs = Array.from(this.form.elements);
    const submit = this.form.querySelector("#submit") as HTMLDivElement;

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
