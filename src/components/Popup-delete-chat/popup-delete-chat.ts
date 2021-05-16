import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplDeleteChat } from './template';
import { createStore, Actions } from '../../modules/Store';
import { Api } from '../../modules/Api';
import { transfromChatsData } from '../../utils/transfrom-chats-data';
import './style.scss';
import { Router } from '../../modules/Router';

type TProps = { [propName: string]: any };
const store = createStore();
const api = new Api();
const router = new Router('.page');

export class PopupDeleteChat extends Block<TProps> {
  props: TProps;

  static _instance: PopupDeleteChat;

  constructor(props?: TProps) {
    super('div', {
      ...props,
      buttonCancel: new Btn({
        buttonText: 'Отмена',
        className: 'popup__btn btn_small btn_white',
        buttonId: 'cancel-delete-chat-btn',
        type: 'button',
        // disabled: true,
      }),
      buttonAdd: new Btn({
        buttonText: 'Удалить',
        className: 'popup__btn btn_small',
        buttonId: 'submit-delete-chat-btn',
        disabled: false,
        type: 'submit',
      }),
    });

    if (PopupDeleteChat._instance) {
      return PopupDeleteChat._instance;
    }

    PopupDeleteChat._instance = this;
  }

  addEvents(): boolean {
    const popup = this._element;

    if (popup) {
      popup.addEventListener('click', this.outsideClick);
      document.addEventListener('keydown', this.outsideClick);
      const form = popup.querySelector<HTMLFormElement>('#delete-chat-form');
      form?.addEventListener('submit', this.onSubmit);
    }
    return true;
  }

  onSubmit(event: any) {
    event.preventDefault();
    const { chatId } = PopupDeleteChat._instance.props;
    const { activeChatId } = store.getState();
    let activeChatIdLocal: any;
    if (Number(chatId) === Number(activeChatId)) {
      activeChatIdLocal = null;
    } else {
      activeChatIdLocal = activeChatId;
    }

    api.deleteChat(chatId).then((res) => {
      if (res.ok) {
        api.getChats().then((res1) => {
          const chatsDataReply = res1.json() as any;
          const chatsDataChanged = transfromChatsData(chatsDataReply);

          store.dispatch({
            type: Actions.SET_ACTIVE_CHAT,
            data: { activeChatId: activeChatIdLocal },
          });

          store.dispatch({
            type: Actions.CHATS_UPDATE,
            data: chatsDataChanged,
          });

          if (Number(chatId) === Number(activeChatId)) {
            router.go({}, '/');
          }
        });
        // const avatarUrl = `${urlApiResources}${userDataFromServer.avatar}`;
        // ProfileForm._instance.setProps({
        //   ...ProfileForm._instance.props,
        //   data: { ...userDataFromServer, avatar: avatarUrl },
        // });
      } else {
        console.log(res.json());
      }
    });
  }

  outsideClick(event: any) {
    const popup = PopupDeleteChat._instance._element;

    if (event.key === 'Escape') {
      if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
        store.dispatch({
          type: Actions.DELETE_CHAT_POPUP_SHOW,
          data: { showPopup: false },
        });
      }
    }
    if (event.type === 'click') {
      if (popup) {
        if (
          popup === event.target ||
          event.target.id === 'delete-user-cancel-btn' ||
          event.target.classList.contains('btn__text')
        ) {
          store.dispatch({
            type: Actions.DELETE_CHAT_POPUP_SHOW,
            data: { showPopup: false },
          });
        }
      }
    }
  }

  render(): string {
    const compiled = compile(tmplDeleteChat);
    const html = compiled({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
