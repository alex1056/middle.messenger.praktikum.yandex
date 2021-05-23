"use strict";

var _chai = require("chai");

var _testBlockHelper = _interopRequireDefault(require("../../../test/testBlockHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import DocumentMock from '../../../test/Mocks/documentMock';
describe('Block test', function () {
  var blockProps = {
    title: 1
  };
  var block;
  before(function () {// global.document = new DocumentMock();
  });
  beforeEach(function () {
    block = new _testBlockHelper["default"](blockProps);
  });
  it('должны измениться props', function (done) {
    (0, _chai.expect)(_testBlockHelper["default"].renderCount).to.be.equal(1);
    (0, _chai.expect)(_testBlockHelper["default"].changedCount).to.be.equal(0);
    block.setProps({
      title: 2
    });
    (0, _chai.expect)(block.props.title).to.be.equal(2);
    (0, _chai.expect)(block.props.title).to.not.be.equal(blockProps.title);
    setTimeout(function () {
      (0, _chai.expect)(_testBlockHelper["default"].renderCount).to.be.equal(2);
      (0, _chai.expect)(_testBlockHelper["default"].changedCount).to.be.equal(1);
      done();
    }, 200);
  });
});