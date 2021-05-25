import { PopupAddUser } from '../components/Popup-add-user';
import { renderDOM } from '../utils/render-dom';

const popupAddUser = new PopupAddUser({});

renderDOM('.page', popupAddUser.getContent());
