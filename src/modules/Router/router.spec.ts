import { expect } from 'chai';
import { Router } from './index';
import WindowMock from '../../../test/Mocks/windowMock';
import { Block } from '../../components/Block';
import { SendForm } from '../../components/Send-form';

// import DocumentMock from '../../../test/Mocks/documentMock';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    global.window = new WindowMock() as any;
    // global.document = new DocumentMock() as any;
    router = new Router('.page');

    router.use('/', SendForm).use('/login', SendForm).use('/chat', SendForm).start();
    // console.log('До вызова it');
  });

  //   it('должен добавить в историю 2 рута', () => {
  //     router.go({}, '/login');
  //     router.go({}, '/chat');
  //     // console.log(router);
  //     expect(router.history.length).to.eq(3);
  //   });

  //   it('тестируем back', () => {
  //     router.go({}, '/login');
  //     router.go({}, '/chat');

  //     expect(router.history.state.url).to.eq('/chat');

  //     router.back();
  //     router.back();

  //     expect(router.history.state.url).to.eq('/chat');
  //   });

  //   it('должен перейти вперед forward', () => {
  //     router.go({}, '/login');
  //     router.go({}, '/chat');

  //     expect(router.history.state.url).to.eq('/chat');

  //     router.back();

  //     expect(router.history.state.url).to.eq('/login');

  //     router.forward();

  //     expect(router.history.state.url).to.eq('/chat');
  //   });

  //   it('should error on back', () => {
  //     router.go({}, '/login');

  //     router.back();
  //     expect(router.back).to.throw();

  //     expect(router.history.state.url).to.eq('/');
  //     expect(router.history.length).to.eq(2);
  //   });

  //   it('should error on forward', () => {
  //     router.go({}, '/login');

  //     expect(router.forward).to.throw();

  //     expect(router.history.state.url).to.eq('/login');
  //     expect(router.history.length).to.eq(2);
  //   });

  //   it('должен в url записать 404', () => {
  //     router.go({}, '/some-route');
  //     console.log(router);
  //     console.log(global.window.history.state);
  //     expect(global.window.history.state.url).to.eq('/404');
  //   });
});
