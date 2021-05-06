import { renderDOM } from '../../utils/render-dom';
import { PopupChngAvatar } from '../../components/Popup-chng-avatar';
import { PopupAddUser } from '../../components/Popup-add-user';
import { PopupDeleteUser } from '../../components/Popup-delete-user';
import { PopupAddMedia } from '../../components/Popup-add-media';
// import { getEventBus, actions } from '../EventBusInstance';
import { createStore, Actions } from '../Store';

export function mountPopups(): void {
  const store = createStore();

  function popupAddMediaHandler() {
    const popupAddMedia = new PopupAddMedia({});
    renderDOM('.body', popupAddMedia.getContent());
    const addMediaPopupState = store.getState().addMediaPopup;

    if (addMediaPopupState.showPopup) {
      popupAddMedia.show('flex');
    } else {
      popupAddMedia.hide();
    }
  }
  store.subscribe(Actions.ADD_MEDIA_SHOW_POPUP, popupAddMediaHandler);

  function popupDeleteUserHandler() {
    const popupDeleteUser = new PopupDeleteUser();
    renderDOM('.body', popupDeleteUser.getContent());
    const deleteUserPopupState = store.getState().deleteUserPopup;

    if (deleteUserPopupState.showPopup) {
      popupDeleteUser.show('flex');
    } else {
      popupDeleteUser.hide();
    }
  }
  store.subscribe(Actions.DELETE_USER_FROM_CHAT, popupDeleteUserHandler);

  function popupChngAvatarHandler() {
    const popupChngAvatar = new PopupChngAvatar();
    renderDOM('.body', popupChngAvatar.getContent());
    const { chngAvatarPopup } = store.getState();

    // const popup = popupChngAvatar.getContent();
    // const formNode = popup?.querySelector<HTMLFormElement>('#form-chng-avatar');
    // const fName = formNode?.querySelector<HTMLElement>('#uploadedfile-form-chng-avatar');
    // const inputLabel = formNode?.querySelector<HTMLElement>('#labelavatar-form-chng-avatar');
    // const submitBtn = formNode?.querySelector<HTMLButtonElement>('#submit-form-chng-avatar');

    // fName.style.display = 'none';
    // inputLabel.style.display = 'block';
    // if (submitBtn) {
    //   submitBtn.disabled = false;
    //   submitBtn.classList.add('btn_disabled');
    // }

    if (chngAvatarPopup.showPopup) {
      popupChngAvatar.show('flex');
    } else {
      popupChngAvatar.hide();
    }
  }
  store.subscribe(Actions.CHNG_AVATAR_POPUP_SHOW, popupChngAvatarHandler);

  function popupAddUserHandler() {
    const popupAddUser = new PopupAddUser();
    renderDOM('.body', popupAddUser.getContent());
    const { addUserPopup } = store.getState();
    if (addUserPopup.showPopup) {
      popupAddUser.show('flex');
    } else {
      popupAddUser.hide();
    }
  }
  store.subscribe(Actions.ADD_USER_POPUP_SHOW, popupAddUserHandler);
}
