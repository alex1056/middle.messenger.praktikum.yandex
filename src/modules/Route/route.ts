import { renderDOM } from '../../utils/render-dom';
import { isEqual } from '../../utils/is-equal';

type T = any;

type TBlock = { [args: string]: any; hide: Function; show: Function; getContent: Function } | null;

export interface IRoute {
  _pathname: string;
  _blockClass: () => any;
  // _blockClass: () => { constructor: Function } as any as { new (): _blockClass; };
  //as { new (layerName: string): TestVectorLayer; };
  _block: TBlock;
  _props: Record<string, T> | null;
  match: Function;
  render: Function;
}

export class Route implements IRoute {
  _pathname: string;
  _blockClass: () => any;
  // _blockClass: () => { constructor: Function };
  _block: TBlock;
  _props: Record<string, T> | null;

  constructor(pathname: string, view: () => any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      // this._block = new (this._blockClass as any)({ rootQuery: '.page' });
      this._block = new (this._blockClass as any)(this._props);

      if (this._props && this._block) {
        renderDOM(this._props.rootQuery, this._block.getContent() as HTMLDivElement);
        // this._block.render();
      } else {
        throw new Error('Не задан root элемент для монтирования в DOM!');
      }
      return;
    }
    this._block.show();
  }
}
