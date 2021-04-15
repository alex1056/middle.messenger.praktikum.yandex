import { ProfileForm } from '../components/Profile-form';
import { renderDOM } from '../utils/render-dom';

const profileForm = new ProfileForm({
  className: 'pform__btn-save btn_hide',
  disabled: true,
});

renderDOM('.page', profileForm.getContent());
