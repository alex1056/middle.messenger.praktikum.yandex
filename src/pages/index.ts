import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { IndexWrapper } from "../components/Index-wrapper";
import { renderDOM } from "../utils/render-dom";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const indexWrapper = new IndexWrapper();
// const form = new Form();
renderDOM(".page", indexWrapper.getContent());

// form.setPopup(document.body as HTMLDivElement);
// form.setEventListeners();
// const currentForm = document.body.querySelector("#form") as HTMLFormElement;

// const formValidator = new Validator(currentForm);
// formValidator.setHandleLabels(true);
// console.log(formValidator);
// form.setFormValidator(formValidator as any);
// form.setHandlers("submit", onSubmitHandlerLogin);
