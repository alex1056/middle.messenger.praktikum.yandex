import { PopupAddUser } from '../components/Popup-add-user';
import { renderDOM } from '../utils/render-dom';

const popupAddUser = new PopupAddUser({
  // className: "pform__btn-save btn_hide",
  // disabledAttr: "disabled",
});

renderDOM('.page', popupAddUser.getContent());
