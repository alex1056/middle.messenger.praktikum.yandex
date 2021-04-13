import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { LoginForm } from "../components/login-form";
import { render } from "../utils/render";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const loginForm = new LoginForm();
const form = new Form();
render(".page", loginForm.getContent());

form.setPopup(document.body as HTMLDivElement);
form.setEventListeners();
const currentForm = document.body.querySelector("#form") as HTMLFormElement;

const formValidator = new Validator(currentForm);
formValidator.setHandleLabels(true);
// console.log(formValidator);
form.setFormValidator(formValidator as any);
form.setHandlers("submit", onSubmitHandlerLogin);
