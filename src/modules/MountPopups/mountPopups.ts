import { renderDOM } from '../../utils/render-dom';
import { PopupChngAvatar } from '../../components/Popup-chng-avatar';
import { PopupAddUser } from '../../components/Popup-add-user';
import { getEventBus, actions } from '../EventBusInstance';

export function mountPopups(): void {
  const eventBus = getEventBus();
  const popupChngAvatar = new PopupChngAvatar();
  renderDOM('.body', popupChngAvatar.getContent());
  popupChngAvatar.hide();

  function popupChngAvatarHandler() {
    popupChngAvatar.show('flex');
  }
  eventBus.on(actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);

  const popupAddUser = new PopupAddUser();
  renderDOM('.body', popupAddUser.getContent());
  popupAddUser.hide();

  function popupAddUserHandler() {
    popupAddUser.show('flex');
  }

  eventBus.on(actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
}
