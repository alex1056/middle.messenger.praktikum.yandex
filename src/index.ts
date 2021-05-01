import { Router } from './modules/Router';
import { getEventBus } from './modules/EventBusInstance';
import { IndexWrapper } from './components/Index-wrapper';
import { ProfileForm } from './components/Profile-form';
import { Page404 } from './components/404';
import { Page500 } from './components/500';
import { LoginForm } from './components/Login-form';
import { RegistrForm } from './components/Registr-form';
import { mountPopups } from './modules/MountPopups';
// import { PopupChngAvatar } from './components/Popup-chng-avatar';
// import { renderDOM } from './utils/render-dom';

const router = new Router('.page');

router.use('/', IndexWrapper);
router.use('/profile', ProfileForm);
router.use('/login', LoginForm);
router.use('/registr', RegistrForm);
router.use('/404', Page404);
router.use('/500', Page500);
router.start();

mountPopups();
// setTimeout(() => {
//   router.go('/profile');
// }, 1000);

// const popupChngAvatar = new PopupChngAvatar();
// renderDOM('.page', popupChngAvatar.getContent());
// popupChngAvatar.hide();
