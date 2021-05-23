"use strict";

var _chai = require("chai");

var _index = require("./index");

var _windowMock = _interopRequireDefault(require("../../../test/Mocks/windowMock"));

var _SendForm = require("../../components/Send-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import DocumentMock from '../../../test/Mocks/documentMock';
describe('Router', function () {
  var router;
  beforeEach(function () {
    global.window = new _windowMock["default"](); // global.document = new DocumentMock() as any;

    router = new _index.Router('.page');
    router.history = global.window.history;
    router.use('/', _SendForm.SendForm).use('/login', _SendForm.SendForm).use('/chat', _SendForm.SendForm).start();
  });
  it('должен добавить в историю 2 рута', function () {
    router.go({}, '', '/login');
    router.go({}, '', '/chat');
    (0, _chai.expect)(router.history.length).to.eq(3);
  });
  it('тестируем back - переход на нужный рут', function () {
    router.go({}, '', '/login');
    router.go({}, '', '/chat');
    (0, _chai.expect)(router.history.state.url).to.eq('/chat');
    router.back();
    router.back();
    (0, _chai.expect)(router.history.state.url).to.eq('/');
  });
  it('должен перейти вперед - forward', function () {
    router.go({}, '', '/login');
    router.go({}, '', '/chat');
    (0, _chai.expect)(router.history.state.url).to.eq('/chat');
    router.back();
    (0, _chai.expect)(router.history.state.url).to.eq('/login');
    router.forward();
    (0, _chai.expect)(router.history.state.url).to.eq('/chat');
  });
  it('должна быть ошибка на back', function () {
    router.go({}, '', '/login');
    router.back();
    (0, _chai.expect)(router.back).to["throw"]();
    (0, _chai.expect)(router.history.state.url).to.eq('/');
    (0, _chai.expect)(router.history.length).to.eq(2);
  });
  it('должна быть ошибка на forward', function () {
    router.go({}, '', '/login');
    (0, _chai.expect)(router.forward).to["throw"]();
    (0, _chai.expect)(router.history.state.url).to.eq('/login');
    (0, _chai.expect)(router.history.length).to.eq(2);
  });
  it('должен в url записать 404', function () {
    router.go({}, '', '/some-route');
    (0, _chai.expect)(global.window.history.state.url).to.eq('/404');
  });
});