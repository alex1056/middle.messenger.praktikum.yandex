import { EventBus } from "../EventBus";
const pug = require("pug");

type Nullable<T> = T | null;
type TProps = { [propName: string]: any };
type TEventBus = {
  on: Function;
  off: Function;
  emit: Function;
};

export class Block {
  props: TProps;
  eventBus: Function;

  public static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  private _element: Nullable<HTMLElement> = null;
  private _meta: { tagName: string; props: TProps };

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    // console.log(props);
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: TEventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: TProps): boolean {
    return true;
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    // console.log('_CDU')
    //console.log('oldProps, newProps', oldProps, newProps)
    this.props = this._makePropsProxy(newProps);
    //console.log('this.props=',this.props);
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      // значит ок с новыми пропсами
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    let block: string = "";
    if (this.render()) {
      block = this.render() as string;
    }

    if (this._element) {
      const template = document.createElement("template");
      template.insertAdjacentHTML("afterbegin", block);
      this._element.appendChild(template.firstElementChild as HTMLElement);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render(): string | void {}

  getContent(): HTMLDivElement {
    if (this.element) {
      return this.element.firstElementChild as HTMLDivElement;
    } else {
      throw new Error("Рендеренный элементы = null");
    }
  }

  _makePropsProxy(props: TProps) {
    const proxyData = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;
        return true;
      },
      deleteProperty(target, prop) {
        throw new Error("Нет доступа");
      },
    });

    return proxyData;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}