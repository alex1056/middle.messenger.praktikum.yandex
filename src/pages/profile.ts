import { ProfileForm } from '../components/Profile-form';
import { renderDOM } from '../utils/render-dom';

const profileForm = new ProfileForm({});

renderDOM('.page', profileForm.getContent());
