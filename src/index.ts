import { Router } from './modules/Router';
// import { getEventBus } from './modules/EventBusInstance';
import { IndexWrapper } from './components/Index-wrapper';
import { ProfileForm } from './components/Profile-form';
import { Page404 } from './components/404';
import { Page500 } from './components/500';
import { LoginForm } from './components/Login-form';
import { RegistrForm } from './components/Registr-form';
import { mountPopups, setPopupsSubscribers } from './modules/MountPopups';
import { createStore, Actions } from './modules/Store';
// import { Api } from './modules/Api';

const store = createStore();
store.subscribe(Actions.ANY_ACTION, (state: any) => {
  localStorage.setItem('app-state', JSON.stringify(state));
});

// store.subscribe(Actions.CHATS_UPDATE, (state: any) => {
//   localStorage.setItem('app-state', JSON.stringify(state));
// });

// store.dispatch({
//   type: Actions.CHATS_UPDATE,
//   data: { val1: 'будет дата1' },
// });

// console.log(store.getState());

const router = new Router('.page');

router.use('/', IndexWrapper);
router.use('/profile', ProfileForm);
router.use('/login', LoginForm);
router.use('/registr', RegistrForm);
router.use('/404', Page404);
router.use('/500', Page500);
router.start();

mountPopups();
setPopupsSubscribers();
// setTimeout(() => {
//   router.go('/profile');
// }, 1000);

// const popupChngAvatar = new PopupChngAvatar();
// renderDOM('.page', popupChngAvatar.getContent());
// popupChngAvatar.hide();
// const data = {
//   login: 'ABlogin',
//   password: '123456',
// };

// const api = new Api();

// api.signIn(data);
// api.logOut();

// testSignIn();

// testLogOut();

// api.getUserData();
// testCreateChat('chat-1');
// testDeleteChat('497');
// testGetChatFiles(496);
// api.getChatsToken(496);

// api.getChats();
