import { Block } from '../components/Block';
import { IndexWrapper } from '../components/Index-wrapper';
import { renderDOM } from '../utils/render-dom';

/*
type TProps = {
  [propName: string]: any;
};

export class RegistrForm extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
*/
type TProps = {
  [propName: string]: any;
  rootQuery: string;
};

export class IndexPage {
  props: TProps;
  constructor(props: TProps) {
    //  super('div', { rootQuery: props.rootQuery });
    this.props = props;
    console.log(props);
  }
  render() {
    console.log(this.props);
    const indexWrapper = new IndexWrapper({});
    renderDOM(this.props.rootQuery, indexWrapper.getContent());
  }
}
