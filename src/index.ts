import { Router } from './modules/Router';
import { IndexWrapper } from './components/Index-wrapper';
import { ProfileForm } from './components/Profile-form';
import { Page404 } from './components/404';
import { Page500 } from './components/500';
import { LoginForm } from './components/Login-form';
import { RegistrForm } from './components/Registr-form';
import { mountPopups, setPopupsSubscribers } from './modules/MountPopups';
import { mountIndexWrapper } from './modules/MountComponents';
// import { createStore, Actions } from './modules/Store';
import { Api } from './modules/Api';

// const store = createStore();
const api = new Api();
// store.subscribe(Actions.ANY_ACTION, (state: any) => {
//   localStorage.setItem('app-state', JSON.stringify(state));
// });

const router = new Router('.page');

let isLoggedIn = false;

api.getUserData().then((res) => {
  if (res.ok) {
    isLoggedIn = true;
    router.use('/', IndexWrapper);
    router.use('/chats/:chatId', IndexWrapper);
    router.use('/profile', ProfileForm);
    router.use('/login', LoginForm);
    router.use('/registr', RegistrForm);
    router.use('/404', Page404);
    router.use('/500', Page500);
    router.start();
  } else {
    isLoggedIn = false;
    router.use('/login', LoginForm);
    router.use('/registr', RegistrForm);
    router.start();
  }
  mountPopups();
  mountIndexWrapper();
  setPopupsSubscribers();

  if (!isLoggedIn) {
    router.go({}, '/login');
  }
});
