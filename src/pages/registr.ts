import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { RegistrForm } from "../components/Registr-form";
import { renderDOM } from "../utils/render-dom";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const registrForm = new RegistrForm();
const form = new Form();
renderDOM(".page", registrForm.getContent());

form.setPopup(document.body as HTMLDivElement);
form.setEventListeners();
const currentForm = document.body.querySelector("#form") as HTMLFormElement;

const formValidator = new Validator(currentForm);
formValidator.setHandleLabels(true);
// console.log(formValidator);
form.setFormValidator(formValidator as any);
form.setHandlers("submit", onSubmitHandlerLogin);
