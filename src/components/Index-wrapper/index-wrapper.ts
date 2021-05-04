import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsList } from '../Chats-list';
import { Msgs } from '../Msgs';
import { tmplIndexWrapper } from './template';
import './style.scss';
import { localsIndexPage } from '../../LocalsData';
// import { getEventBus, actions } from '../../modules/EventBusInstance';
import { createStore, Actions } from '../../modules/Store';

// const eventBus = getEventBus();
const store = createStore();

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block<TProps> {
  props: TProps;

  static _instance: IndexWrapper;

  constructor(props: TProps) {
    super('div', {
      chatsList: new ChatsList({ ...props, ...localsIndexPage }),
      msgs: new Msgs(props),
    });

    const { rootQuery } = props as any;

    if (IndexWrapper._instance) {
      return IndexWrapper._instance;
    }

    this.rootQuery = rootQuery;
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    IndexWrapper._instance = this;
  }

  addEvents(): boolean {
    // const { setListenersAddUser } = this.props as any;
    let nodeAddUserBtn = null;

    if (this._element) {
      nodeAddUserBtn = this._element.querySelector('#btn-new-chat');
    }

    if (nodeAddUserBtn) {
      nodeAddUserBtn.addEventListener('click', this.addUser);
    }

    let deleteUserButtons = null;

    if (this._element) {
      deleteUserButtons = this._element.querySelectorAll<HTMLElement>('.user__delete-icon');
      deleteUserButtons.forEach((button) => button.addEventListener('click', this.deleteUser));
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
      type: Actions.ADD_MEDIA_SHOW_POPUP,
      data: { showPopup: true },
    });
  }

  deleteUser() {
    store.dispatch({
      type: Actions.DELETE_USER_FROM_CHAT,
      data: { showPopup: true },
    });
  }

  addUser() {
    IndexWrapper._instance.setProps({
      ...IndexWrapper._instance.props,
      // setListeners: true,
      setListenersAddUser: true,
    });
    store.dispatch({
      type: Actions.ADD_USER_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  render(): string {
    const compiled = compile(tmplIndexWrapper);
    const html = compiled({
      chatsList: this.props.chatsList.render(),
      msgs: this.props.msgs.render(),
    });
    return html;
  }
}
