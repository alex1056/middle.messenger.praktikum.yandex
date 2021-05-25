import { PopupChngAvatar } from '../components/Popup-chng-avatar';
import { renderDOM } from '../utils/render-dom';

const popupChngAvatar = new PopupChngAvatar({});

renderDOM('.page', popupChngAvatar.getContent());
