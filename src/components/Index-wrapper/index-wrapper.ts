import { compile } from 'pug';
import { Block } from '../Block';
import { ChatsList } from '../Chats-list';
import { Msgs } from '../Msgs';
import { tmplIndexWrapper } from './template';
import './style.scss';
import { localsIndexPage } from '../../LocalsData';
import { getEventBus, actions } from '../../modules/EventBusInstance';

const eventBus = getEventBus();

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

    IndexWrapper._instance = this;
  }

  addEvents(): boolean {
    const { setListenersAddUser } = this.props as any;
    let nodeAddUserBtn = null;

    if (this._element) {
      nodeAddUserBtn = this._element.querySelector('#btn-new-chat');
    }

    if (nodeAddUserBtn) {
      nodeAddUserBtn.addEventListener('click', this.addUser);
    }

    if (setListenersAddUser) {
      const popupAddUser = document.body.querySelector<HTMLElement>('#popup-add-user');
      if (popupAddUser) {
        popupAddUser.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
      }
    }

    return true;
  }

  outsideClick = (event: any) => {
    const popupAddUser = document.body.querySelector<HTMLElement>('#popup-add-user');
    if (event.type === 'click') {
      if (popupAddUser) {
        if (popupAddUser === event.target) {
          popupAddUser.style.display = 'none';
          popupAddUser.removeEventListener('click', this.outsideClick);
        }
      }
    }
    if (event.key === 'Escape') {
      if (popupAddUser) {
        popupAddUser.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
      }
    }
  };

  addUser() {
    IndexWrapper._instance.setProps({
      ...IndexWrapper._instance.props,
      // setListeners: true,
      setListenersAddUser: true,
    });
    eventBus.emit(actions.ADD_USER_POPUP_SHOW);
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
