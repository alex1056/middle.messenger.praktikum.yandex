import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsListWrapper } from '../Chats-list-wrapper';
import { Msgs } from '../Msgs';
import { FeedMsg } from '../Feed-msg';
import { tmplIndexWrapper } from './template';
import './style.scss';

import { createStore, Actions, chatsDataSelector } from '../../modules/Store';
import { Api } from '../../modules/Api';
import { WebSocketRun } from '../../modules/WebSocket';
import { transfromChatsData } from '../../utils/transfrom-chats-data';
import { timeParce } from '../../utils/timeParse';
import { Router } from '../../modules/Router';

const api = new Api();
const store = createStore();
const router = new Router('.page');
const { userData } = store.getState();
const ws = new WebSocketRun();

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block<TProps> {
  props: TProps;

  dataset: { [propName: string]: any };

  token: string | null;

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
        // activeChatData: { id: '', avatar: '', title: '', created_by: 0, last_message: null, unread_count: 0 },
        activeChatData: null,
      }),
    });

    const { rootQuery } = props as any;

    if (IndexWrapper._instance) {
      return IndexWrapper._instance;
    }

    this.rootQuery = rootQuery;

    this.addChat = this.addChat.bind(this);

    this.deleteChat = this.deleteChat.bind(this);
    // this.wsInit = this.wsInit.bind(this);

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

      const { history } = router;
      const { state } = history;

      let activeChatIdLocal = activeChatId;
      if (!state) {
        activeChatIdLocal = null;
      }

      if (activeChatIdLocal) {
        IndexWrapper._instance.wsInit(activeChatIdLocal);
      }

      IndexWrapper._instance.setProps({
        activeChatData: activeChatIdLocal ? activeChatData : null,
        activeChatId: Number(activeChatIdLocal),
        ...this.props,
        ...IndexWrapper._instance.props,
        chatList: new ChatsListWrapper({
          ...this.props,
          activeChatId: Number(activeChatIdLocal),
          chatsData: chatsData.data,
        }),
        msgs: new Msgs({
          ...this.props,
          activeChatId: Number(activeChatIdLocal),
          activeChatData: activeChatIdLocal ? activeChatData : null,
        }),
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

    let sendMsgBtn = null;

    if (this._element) {
      sendMsgBtn = this._element.querySelector<HTMLElement>('#send-msg-form');
    }
    if (sendMsgBtn) {
      sendMsgBtn.addEventListener('submit', this.sendMsg);
    }

    let chngChatAvatar = null;

    if (this._element) {
      chngChatAvatar = this._element.querySelector<HTMLElement>('#msgs-avatar');
    }
    if (chngChatAvatar) {
      chngChatAvatar.addEventListener('click', this.addChngMsgAvatar);
    }

    return true;
  }

  sendMsg(event: any) {
    event.preventDefault();

    if (event.target.elements[0].value.length) {
      const msg = event.target.elements[0].value;
      if (ws.socket.readyState !== 1) {
        const { activeChatId } = store.getState();
        IndexWrapper._instance.wsInit(activeChatId, msg);
      } else {
        ws.socketSend(event.target.elements[0].value);
      }
      event.target.elements[0].value = '';
    }
  }

  wsInit(activeChatId: number, msg?: string) {
    if (ws.timerId) {
      ws.socketStopPing();
    }

    api.getChatToken(activeChatId).then((res) => {
      if (res.ok) {
        const { token } = res.json() as any;
        ws.socketInit(userData.id, activeChatId, token).then(() => {
          ws.socketGetOldMsgs();
          // ws.socketPing();
          if (msg) {
            ws.socketSend(msg);
          }
        });
        ws.socketOnClose();
        ws.socketOnError();
        ws.socketOnMessage(IndexWrapper._instance.publishMessage);
      } else {
        const { reason } = res.json();
        console.log(reason);
      }
    });
  }

  publishMessage(data: string) {
    const msgObj = JSON.parse(data);

    if (Array.isArray(msgObj)) {
      // console.log('Пришел массив');
      const msgObjReversed = msgObj.reverse();
      msgObjReversed.forEach((msg) => IndexWrapper._instance.handleMsg(msg));
    } else {
      IndexWrapper._instance.handleMsg(msgObj);
    }

    const { activeChatId } = store.getState();
    const activeChatData = chatsDataSelector(activeChatId);
    const chatNode = document.querySelector(`[data-chat-id='${activeChatId}']`);
    if (chatNode) {
      if (activeChatData.unread_count < 20) {
        const circleNode = chatNode.querySelector<HTMLDivElement>('.chat__unread-mess-numb');
        if (circleNode) {
          circleNode.style.display = 'none';
        }
      } else {
        const circleNode = chatNode.querySelector<HTMLDivElement>('.circle-unread__text');
        if (circleNode) {
          circleNode.textContent = String(activeChatData.unread_count - 20);
        }
      }
    }
  }

  handleMsg(msgObj: any) {
    let dataPublish = {};

    if (msgObj.user_id && msgObj.content) {
      if (userData.id === msgObj.user_id) {
        dataPublish = {
          incomingMsg: false,
          content: msgObj.content,
          time: timeParce(msgObj.time),
          is_read: msgObj.is_read,
        };
      } else {
        dataPublish = {
          incomingMsg: true,
          content: msgObj.content,
          time: timeParce(msgObj.time),
          is_read: msgObj.is_read,
        };
      }

      const feedMsg = new FeedMsg({
        data: dataPublish,
      });

      const feedNode = document.querySelector<HTMLDivElement>('.feed__container');
      if (feedNode) {
        const elem = feedNode.appendChild(feedMsg.getContent());
        elem.scrollIntoView();
      }
    }
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

    IndexWrapper._instance.getChatsUpdateStore();

    router.go({ activeChatId: this.dataset.chatId }, `/chats/${this.dataset.chatId}`);
    ws.socketClose();
    IndexWrapper._instance.wsInit(this.dataset.chatId);
  }

  getChatsUpdateStore() {
    api.getChats().then((res) => {
      const chatsDataReply = res.json() as any;
      const chatsDataChanged = transfromChatsData(chatsDataReply);

      store.dispatch({
        type: Actions.CHATS_UPDATE,
        data: chatsDataChanged,
      });
    });
  }

  addChngMsgAvatar() {
    store.dispatch({
      type: Actions.MSGS_CHNG_AVATAR_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

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
    const compiled = compile(tmplIndexWrapper);
    const html = compiled({
      ...this.props,
      chatList: this.props.chatList.render(),
      msgs: this.props.msgs.render(),
    });

    return html;
  }
}
