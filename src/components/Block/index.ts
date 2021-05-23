import { EventBus } from '../../modules/EventBus';

type Nullable<T> = T | null;
type TEventBus = {
  on: Function;
  off: Function;
  emit: Function;
};

type TObjectRecord = { [propName: string]: any };

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CDU_REMOUNT = 'flow:component-did-update-remount',
  FLOW_CDU_REMOUNT_ADD_EVENTS = 'flow:component-did-update-remount-add-events',
}

export class Block<TProps> {
  props: TProps;

  eventBus: TEventBus;

  events: TObjectRecord;

  _element: Nullable<HTMLElement> = null;

  rootQuery: string;

  private _meta: { tagName: string; props: TProps };

  constructor(tagName = 'div', props = {} as TProps) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.rootQuery = '';
    this.props = this._makePropsProxy(props);

    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  _registerEvents(eventBus: TEventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_CDU_REMOUNT, this._renderDOM.bind(this));
    eventBus.on(EVENTS.FLOW_CDU_REMOUNT_ADD_EVENTS, this._addEvents.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus.emit(EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount(): boolean {
    return true;
  }

  _componentDidUpdate(_oldProps: TProps, newProps: TProps) {
    this.props = this._makePropsProxy(newProps);

    const response = this.componentDidUpdate();

    if (response) {
      this._removeEvents();
      this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }

    this.eventBus.emit(EVENTS.FLOW_CDU, this.props, nextProps);
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents(): void {
    this.addEvents();
    const { events = {} } = this.props as any;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  addEvents(): boolean {
    return false;
  }

  _removeEvents(): void {
    this.removeEvents();
    const { events = {} } = this.props as any;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  removeEvents(): boolean {
    return false;
  }

  _renderDOM() {
    // console.log('Из _renderDOM', this.rootQuery);
    if (this.rootQuery) {
      try {
        const root = document.querySelector(this.rootQuery);
        while (root && root.firstChild) {
          root.removeChild(root.lastChild as HTMLDivElement);
        }
        if (root) {
          root.appendChild(this.getContent());
          return root as HTMLElement;
        }
      } catch {
        console.log('DOM элемент не найден!');
      }
      this.eventBus.emit(EVENTS.FLOW_CDU_REMOUNT_ADD_EVENTS);
    }
  }

  _render() {
    let block: string = '';
    if (this.render()) {
      block = this.render() as string;
    }

    if (this._element) {
      const template = document.createElement('template');

      template.insertAdjacentHTML('afterbegin', block);
      this._element = template.firstElementChild as HTMLElement;
    }
    // console.log(this._element);

    this._addEvents();
    this.eventBus.emit(EVENTS.FLOW_CDU_REMOUNT);
  }

  render(): string | void {}

  getContent(): HTMLDivElement {
    if (this._element) {
      return this._element as HTMLDivElement;
    }
    throw new Error('Рендеренный элемент = null');
  }

  _makePropsProxy(props: TProps): TProps {
    const proxyData = new Proxy(props as any, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;
        return true;
      },
      deleteProperty() {
        // args = target, prop
        throw new Error('Нет доступа');
      },
    });

    return proxyData;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show(displayType: string = 'block') {
    this.getContent().style.display = displayType;
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
