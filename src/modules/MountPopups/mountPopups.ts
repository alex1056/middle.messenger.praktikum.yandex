import { renderDOM } from '../../utils/render-dom';
import { PopupChngAvatar } from '../../components/Popup-chng-avatar';
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
}
