import { Router } from './modules/Router';
import { IndexWrapper } from './components/Index-wrapper';
import { ProfileForm } from './components/Profile-form';
import { Page404 } from './components/404';
import { Page500 } from './components/500';
import { LoginForm } from './components/Login-form';
import { RegistrForm } from './components/Registr-form';

const router = new Router('.page');

router.use('/', IndexWrapper);
router.use('/profile', ProfileForm);
router.use('/login', LoginForm);
router.use('/registr', RegistrForm);
router.use('/404', Page404);
router.use('/500', Page500);
router.start();

// setTimeout(() => {
//   router.go('/profile');
// }, 1000);
