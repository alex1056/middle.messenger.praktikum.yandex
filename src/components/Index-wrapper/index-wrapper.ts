import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsListWrapper } from '../Chats-list-wrapper';
import { Msgs } from '../Msgs';
import { tmplIndexWrapper } from './template';
import './style.scss';

import { createStore, Actions, chatsDataSelector } from '../../modules/Store';
import { Api, urlApiResources } from '../../modules/Api';

import { transfromChatsData } from '../../utils/transfrom-chats-data';
import { Router } from '../../modules/Router';

const api = new Api();
const store = createStore();
const router = new Router('.page');

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block<TProps> {
  props: TProps;

  dataset: { [propName: string]: any };

  static _instance: IndexWrapper;

  constructor(props: TProps) {
    // console.log('Index Wrapper', props);
    super('div', {
      chatList: new ChatsListWrapper({
        ...props,
        chatsData: [{ id: '', avatar: '', title: '', created_by: 0, last_message: null, unread_count: 0 }],
      }),
      msgs: new Msgs({
        ...props,
        activeChatData: { id: '', avatar: '', title: '', created_by: 0, last_message: null, unread_count: 0 },
      }),
    });

    const { rootQuery } = props as any;

    if (IndexWrapper._instance) {
      return IndexWrapper._instance;
    }

    this.rootQuery = rootQuery;

    this.addChat = this.addChat.bind(this);

    this.deleteChat = this.deleteChat.bind(this);

    IndexWrapper._instance = this;
  }

  componentDidMount(): boolean {
    api.getChats().then((res) => {
      const chatsDataReply = res.json() as any;
      const chatsDataChanged = transfromChatsData(chatsDataReply);

      store.dispatch({
        type: Actions.CHATS_UPDATE,
        data: chatsDataChanged,
      });
      const { chatsData, activeChatId } = store.getState();
      const activeChatData = chatsDataSelector(activeChatId);

      IndexWrapper._instance.setProps({
        activeChatData,
        ...this.props,
        ...IndexWrapper._instance.props,
        chatList: new ChatsListWrapper({ ...this.props, chatsData: chatsData.data }),
        msgs: new Msgs({ ...this.props, chatId: activeChatId, activeChatData }),
      });
    });

    return true;
  }

  addEvents(): boolean {
    let nodeAddChat = null;

    if (this._element) {
      nodeAddChat = this._element.querySelector('#btn-new-chat');
    }

    if (nodeAddChat) {
      nodeAddChat.addEventListener('click', this.addChat);
    }

    let nodeGoProfileBtn = null;

    if (this._element) {
      nodeGoProfileBtn = this._element.querySelector('#btn-go-profile');
    }

    if (nodeGoProfileBtn) {
      nodeGoProfileBtn.addEventListener('click', this.goProfile);
    }

    let deleteChatButtons = null;

    if (this._element) {
      deleteChatButtons = this._element.querySelectorAll<HTMLElement>('.chat__delete-icon');
      deleteChatButtons.forEach((button) => button.addEventListener('click', this.deleteChat));
    }

    let userMenu = null;

    if (this._element) {
      userMenu = this._element.querySelectorAll<HTMLElement>('#add-remove-user');
      userMenu.forEach((button) => button.addEventListener('click', this.userMenu));
    }

    let addMediaBtn = null;

    if (this._element) {
      addMediaBtn = this._element.querySelector<HTMLElement>('#add-media-btn-popup');
    }
    if (addMediaBtn) {
      addMediaBtn.addEventListener('click', this.addMedia);
    }

    let selectChats = null;

    if (this._element) {
      selectChats = this._element.querySelectorAll<HTMLElement>('.chat');
    }
    if (selectChats) {
      selectChats.forEach((chatNode) => chatNode.addEventListener('click', this.selectChat));
    }

    return true;
  }

  selectChat(event: any) {
    const selectChats = document.querySelectorAll<HTMLElement>('.chat');

    if (selectChats) {
      selectChats.forEach((chatNode) => chatNode.classList.remove('chat_selected'));
    }
    event.currentTarget.classList.toggle('chat_selected');
    store.dispatch({
      type: Actions.SET_ACTIVE_CHAT,
      data: { activeChatId: this.dataset.chatId },
    });

    router.go({ chatId: this.dataset.chatId }, `/chats/${this.dataset.chatId}`);
  }

  // componentDidUpdate(): boolean {
  //   console.log('componentDidUpdate, props', { ...this.props });
  //   return true;
  //   // console.log()
  // }

  goProfile() {
    router.go({}, '/profile');
  }

  addMedia() {
    store.dispatch({
      type: Actions.ADD_MEDIA_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  userMenu() {
    store.dispatch({
      type: Actions.USER_MENU_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  deleteChat(event: any) {
    store.dispatch({
      type: Actions.DELETE_CHAT_POPUP_SHOW,
      data: { showPopup: true, chatId: event.target.dataset.chatId, chatName: event.target.dataset.chatName },
    });
  }

  addChat() {
    store.dispatch({
      type: Actions.ADD_CHAT_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  render(): string {
    // console.log('IndexWrapper render this.props.msgs', this.props.msgs.render());
    const compiled = compile(tmplIndexWrapper);
    const html = compiled({
      ...this.props,
      chatList: this.props.chatList.render(),
      msgs: this.props.msgs.render(),
    });
    // console.log('IndexWrapper render', html);
    return html;
  }
}
