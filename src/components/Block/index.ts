import { EventBus } from '../EventBus';

type Nullable<T> = T | null;
type TEventBus = {
  on: Function;
  off: Function;
  emit: Function;
};

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update',
}

export class Block<TProps> {
  props: TProps;

  eventBus: TEventBus;

  _element: Nullable<HTMLElement> = null;

  private _meta: { tagName: string; props: TProps };

  constructor(tagName = 'div', props: TProps) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

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

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(): boolean {
    return true;
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    this.props = this._makePropsProxy(newProps);
    const response = this.componentDidUpdate();
    if (response) {
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
    if (!this.addEvents()) {
      // логика для добавления общих событий
    }
  }

  addEvents(): boolean {
    return false;
  }

  _render() {
    let block: string = '';
    if (this.render()) {
      block = this.render() as string;
    }

    if (this._element) {
      const template = document.createElement('template');
      template.insertAdjacentHTML('afterbegin', block);
      this._element.appendChild(template.firstElementChild as HTMLElement);
    }
    this._addEvents();
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

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
