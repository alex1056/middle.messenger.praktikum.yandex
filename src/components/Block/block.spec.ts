import { expect } from 'chai';

import TestBlock from '../../../test/testBlockHelper';

describe('Block test', () => {
  const blockProps = { title: 1 };

  let block: any;

  beforeEach(function () {
    block = new TestBlock(blockProps);
  });

  it('должны измениться props', (done) => {
    expect(TestBlock.renderCount).to.be.equal(1);
    expect(TestBlock.changedCount).to.be.equal(0);

    block.setProps({ title: 2 });

    expect(block.props.title).to.be.equal(2);
    expect(block.props.title).to.not.be.equal(blockProps.title);

    setTimeout(() => {
      expect(TestBlock.renderCount).to.be.equal(2);
      expect(TestBlock.changedCount).to.be.equal(1);
      done();
    }, 200);
  });
});
