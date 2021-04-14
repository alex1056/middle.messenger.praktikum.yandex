import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { ProfileForm } from "../components/Profile-form";
import { renderDOM } from "../utils/render-dom";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const profileForm = new ProfileForm({
  className: "pform__btn-save",
  ctrlsContainer: "pform__ctrls-container_hide",
});
const form = new Form();
renderDOM(".page", profileForm.getContent());

form.setPopup(document.body as HTMLDivElement);
form.setEventListeners();
const currentForm = document.body.querySelector("#form") as HTMLFormElement;

const formValidator = new Validator(currentForm);
formValidator.setHandleLabels(false);
form.setFormValidator(formValidator as any);
form.setHandlers("submit", onSubmitHandlerLogin);
