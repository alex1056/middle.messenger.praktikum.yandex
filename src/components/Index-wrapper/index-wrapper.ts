import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsListWrapper } from '../Chats-list-wrapper';
import { Msgs } from '../Msgs';
import { tmplIndexWrapper } from './template';
import './style.scss';
import { localsIndexPage } from '../../LocalsData';
// import { getEventBus, actions } from '../../modules/EventBusInstance';
import { createStore, Actions } from '../../modules/Store';

const store = createStore();

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block<TProps> {
  props: TProps;

  static _instance: IndexWrapper;

  constructor(props: TProps) {
    super('div', {
      chatList: new ChatsListWrapper({ ...props, ...localsIndexPage }),
      msgs: new Msgs(props),
    });

    const { rootQuery } = props as any;

    if (IndexWrapper._instance) {
      return IndexWrapper._instance;
    }

    this.rootQuery = rootQuery;
    // this.addUser = this.addUser.bind(this);
    this.addChat = this.addChat.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
    this.deleteChat = this.deleteChat.bind(this);

    IndexWrapper._instance = this;
  }

  addEvents(): boolean {
    // const { setListenersAddUser } = this.props as any;
    let nodeAddChat = null;

    if (this._element) {
      nodeAddChat = this._element.querySelector('#btn-new-chat');
    }

    if (nodeAddChat) {
      nodeAddChat.addEventListener('click', this.addChat);
    }

    let deleteChatButtons = null;

    if (this._element) {
      deleteChatButtons = this._element.querySelectorAll<HTMLElement>('.chat__delete-icon');
      deleteChatButtons.forEach((button) => button.addEventListener('click', this.deleteChat));
    }

    let addMediaBtn = null;

    if (this._element) {
      addMediaBtn = this._element.querySelector<HTMLElement>('#add-media-btn-popup');
    }
    if (addMediaBtn) {
      addMediaBtn.addEventListener('click', this.addMedia);
    }

    return true;
  }

  // add-media-btn-popup
  addMedia() {
    store.dispatch({
      type: Actions.ADD_MEDIA_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  // deleteUser() {
  //   store.dispatch({
  //     type: Actions.DELETE_USER_FROM_CHAT,
  //     data: { showPopup: true },
  //   });
  // }

  deleteChat() {
    store.dispatch({
      type: Actions.DELETE_CHAT_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  addChat() {
    // IndexWrapper._instance.setProps({
    //   ...IndexWrapper._instance.props,
    //   // setListeners: true,
    //   // setListenersAddChat: true,
    // });
    store.dispatch({
      type: Actions.ADD_CHAT_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  // addUser() {
  //   IndexWrapper._instance.setProps({
  //     ...IndexWrapper._instance.props,
  //     // setListeners: true,
  //     setListenersAddUser: true,
  //   });
  //   store.dispatch({
  //     type: Actions.ADD_USER_POPUP_SHOW,
  //     data: { showPopup: true },
  //   });
  // }

  render(): string {
    const compiled = compile(tmplIndexWrapper);
    const html = compiled({
      chatList: this.props.chatList.render(),
      msgs: this.props.msgs.render(),
    });
    return html;
  }
}
