import { Block } from '../src/components/Block';

type TProps = {
  [propName: string]: any;
};

export default class TestBlock extends Block<TProps> {
  public static renderCount: number;

  public static changedCount: number;

  constructor(props: TProps) {
    TestBlock.renderCount = 0;
    TestBlock.changedCount = 0;
    super('div', props);
  }

  componentDidUpdate() {
    TestBlock.changedCount += 1;
    return true;
  }

  render() {
    TestBlock.renderCount += 1;
    // return document.createElement('div');
    // return '<div></div>';
    return super.render();
  }
}
