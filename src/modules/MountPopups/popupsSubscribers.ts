import { createStore, Actions } from '../Store';
import { ProfileForm } from '../../components/Profile-form';

export function setPopupsSubscribers(): void {
  const store = createStore();

  function updateAvatar() {
    const profileForm = new ProfileForm({});
    const { userData } = store.getState();
    profileForm.setProps({
      ...ProfileForm._instance.props,
      data: userData,
    });
  }

  store.subscribe(Actions.UPDATE_USER_AVATAR, updateAvatar);
}
