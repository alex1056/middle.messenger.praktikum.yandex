import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { LoginForm } from "../components/Login-form";
import { renderDOM } from "../utils/render-DOM";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const loginForm = new LoginForm();
const form = new Form();
renderDOM(".page", loginForm.getContent());

form.setPopup(document.body as HTMLDivElement);
form.setEventListeners();
const currentForm = document.body.querySelector("#form") as HTMLFormElement;

const formValidator = new Validator(currentForm);
formValidator.setHandleLabels(true);
// console.log(formValidator);
form.setFormValidator(formValidator as any);
form.setHandlers("submit", onSubmitHandlerLogin);
