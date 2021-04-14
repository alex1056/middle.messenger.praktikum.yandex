import { PopupAddUser } from "../components/Popup-add-user";
import { renderDOM } from "../utils/render-dom";

const popupAddUser = new PopupAddUser({
  // className: "pform__btn-save btn_hide",
  // disabledAttr: "disabled",
});
// const form = new Form();
renderDOM(".page", popupAddUser.getContent());

// form.setPopup(document.body as HTMLDivElement);
// form.setEventListeners();
// const currentForm = document.body.querySelector("#form") as HTMLFormElement;

// const formValidator = new Validator(currentForm);
// formValidator.setHandleLabels(true);
// // console.log(formValidator);
// form.setFormValidator(formValidator as any);
// form.setHandlers("submit", onSubmitHandlerLogin);
