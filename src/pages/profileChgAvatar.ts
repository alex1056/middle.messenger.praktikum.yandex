// import { Form } from "../modules/form";
// import { Validator } from "../modules/validator";

import { PopupChngAvatar } from '../components/Popup-chng-avatar';
import { renderDOM } from '../utils/render-dom';
// import { onSubmitHandlerLogin } from "../modules/form/onSubmitHandlers";

const popupChngAvatar = new PopupChngAvatar({
  // className: "pform__btn-save btn_hide",
  // disabledAttr: "disabled",
});
// const form = new Form();
renderDOM('.page', popupChngAvatar.getContent());

// form.setPopup(document.body as HTMLDivElement);
// form.setEventListeners();
// const currentForm = document.body.querySelector("#form") as HTMLFormElement;

// const formValidator = new Validator(currentForm);
// formValidator.setHandleLabels(true);
// // console.log(formValidator);
// form.setFormValidator(formValidator as any);
// form.setHandlers("submit", onSubmitHandlerLogin);
