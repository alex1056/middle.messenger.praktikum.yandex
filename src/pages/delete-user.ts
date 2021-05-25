import { PopupDeleteUser } from '../components/Popup-delete-user';
import { renderDOM } from '../utils/render-dom';

const popupDeleteUser = new PopupDeleteUser();

renderDOM('.page', popupDeleteUser.getContent());
