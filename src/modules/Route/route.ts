import { renderDOM } from '../../utils/render-dom';
import { isEqual } from '../../utils/is-equal';

type T = any;

type TBlock = { [args: string]: any; hide: Function; show: Function; getContent: Function } | null;

export interface IRoute {
  _pathname: string;
  _blockClass: () => any;
  _block: TBlock;
  _props: Record<string, T> | null;
  match: Function;
  render: Function;
}

export class Route implements IRoute {
  _pathname: string;

  _blockClass: () => any;

  _block: TBlock;

  _props: Record<string, T> | null;

  _params: any;

  constructor(pathname: string, view: () => any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._params = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    const pattern = '/chats/:chatId';

    if (isEqual(pathname, this._pathname)) {
      return true;
    }

    if (pattern === this._pathname) {
      const routeMatcher = new RegExp(pattern.replace(/:[^\s/?]+/g, '([\\w-]+)'));
      const isRoute = pathname.match(routeMatcher);
      // isRoute - результат распознавания pathname по шаблону pattern
      // console.log('isRoute, pathname', isRoute, pathname);
      if (isRoute) {
        this._params = { activeChatId: Number(isRoute[1]) };
        return true;
      }
    }

    return false;
  }

  render() {
    // console.log('Render, this._block', this._block);
    if (!this._block) {
      this._block = new (this._blockClass as any)({ ...this._props, ...this._params });

      if (this._props && this._block) {
        const node: HTMLDivElement = this._block.getContent();

        renderDOM(this._props.rootQuery, node);
      } else {
        throw new Error('Не задан root элемент для монтирования в DOM!');
      }
      return;
    }
    // console.log('Render, this._block.props', { ...this._block.props });
    // console.log('Render, this._props', { ...this._props });
    // console.log('Render, this._params', { ...this._params });
    // const date = new Date();

    this._block.setProps({
      // date,
      ...this._block.props,
      ...this._props,
      ...this._params,
    });

    const nodeToRemove = document.querySelector('.main');
    if (nodeToRemove) {
      nodeToRemove.remove();
      const node: HTMLDivElement = this._block.getContent();
      // console.log('node', node);
      renderDOM(this._props?.rootQuery, node);
    }

    // console.log('После set props, this._block.props', { ...this._block.props });
    // console.log('После set props, this._block', this._block);
    this._block.show('flex');
  }
}
