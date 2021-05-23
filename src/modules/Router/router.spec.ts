import { expect } from 'chai';
import { Router } from './index';
import WindowMock from '../../../test/Mocks/windowMock';
import { Block } from '../../components/Block';
import DocumentMock from '../../../test/Mocks/documentMock';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    global.window = new WindowMock() as any;
    global.document = new DocumentMock() as any;

    router = new Router('');

    router.use('/login', Block).use('/chat', Block).start();
  });

  it('should add routes', () => {
    router.go({}, '/login');

    expect(router.history.length).to.eq(2);
  });

  it('should back', () => {
    router.go({}, '/login');
    router.go({}, '/chat');

    expect(router.history.state.url).to.eq('/chat');

    router.back();

    expect(router.history.state.url).to.eq('/login');
    expect(router.history.length).to.eq(3);
  });

  it('should forward', () => {
    router.go({}, '/login');
    router.go({}, '/chat');

    expect(router.history.state.url).to.eq('/chat');

    router.back();

    expect(router.history.state.url).to.eq('/login');

    router.forward();

    expect(router.history.state.url).to.eq('/chat');
    expect(router.history.length).to.eq(3);
  });

  //   it('should changed document title', () => {
  //     router.go({}, '/login');

  //     expect(global.document.title).to.eq('Login');
  //   });

  it('should error on back', () => {
    router.go({}, '/login');

    router.back();
    expect(router.back).to.throw();

    expect(router.history.state.url).to.eq('/');
    expect(router.history.length).to.eq(2);
  });

  it('should error on forward', () => {
    router.go({}, '/login');

    expect(router.forward).to.throw();

    expect(router.history.state.url).to.eq('/login');
    expect(router.history.length).to.eq(2);
  });

  it('should route error', () => {
    router.go({}, '/logout');

    expect(global.window.history.state.url).to.eq('/error');
  });
});
