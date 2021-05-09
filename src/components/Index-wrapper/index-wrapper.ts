import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsListWrapper } from '../Chats-list-wrapper';
import { Msgs } from '../Msgs';
import { tmplIndexWrapper } from './template';
import './style.scss';
// import { localsIndexPage } from '../../LocalsData';
// import { localsIndexPage2 } from '../../LocalsData/index2';
// import { getEventBus, actions } from '../../modules/EventBusInstance';
import { createStore, Actions } from '../../modules/Store';
import { Api, urlApiResources } from '../../modules/Api';
// import { lastMsgTimeToString } from '../../utils/msg-time';
import { transfromChatsData } from '../../utils/transfrom-chats-data';

const api = new Api();
const store = createStore();

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block<TProps> {
  props: TProps;

  dataset: { [propName: string]: any };

  // chatsData: { [propName: string]: any };

  static _instance: IndexWrapper;

  constructor(props: TProps) {
    // console.log('props=', props);
    super('div', {
      chatList: new ChatsListWrapper({
        ...props,
        chatsData: [{ id: '', avatar: '', title: '', created_by: 0, last_message: null, unread_count: 0 }],
      }),
      msgs: new Msgs(props),
    });

    // console.log('this.props после super=', { ...this.props });
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

  componentDidMount(): boolean {
    api.getChats().then((res) => {
      const chatsDataReply = res.json() as any;
      const chatsDataChanged = transfromChatsData(chatsDataReply);

      store.dispatch({
        type: Actions.CHATS_UPDATE,
        data: chatsDataChanged,
      });
      const { chatsData } = store.getState();
      IndexWrapper._instance.setProps({
        ...IndexWrapper._instance.props,
        chatList: new ChatsListWrapper({ ...this.props, chatsData: chatsData.data }),
      });
    });

    return true;
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

  deleteChat(event: any) {
    store.dispatch({
      type: Actions.DELETE_CHAT_POPUP_SHOW,
      data: { showPopup: true, chatId: event.target.dataset.chatId, chatName: event.target.dataset.chatName },
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
      ...this.props,
      chatList: this.props.chatList.render(),
      msgs: this.props.msgs.render(),
    });
    return html;
  }
}
