import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

import { ProfileForm } from "../components/Profile-form";
import { renderDOM } from "../utils/render-dom";
import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const profileForm = new ProfileForm({
  className: "pform__btn-save btn_hide",
  disabledAttr: "disabled",
});
const form = new Form();
renderDOM(".page", profileForm.getContent());

// form.setPopup(document.body as HTMLDivElement);
// form.setEventListeners();
// const currentForm = document.body.querySelector("#form") as HTMLFormElement;

// const formValidator = new Validator(currentForm);
// formValidator.setHandleLabels(true);
// // console.log(formValidator);
// form.setFormValidator(formValidator as any);
// form.setHandlers("submit", onSubmitHandlerLogin);
