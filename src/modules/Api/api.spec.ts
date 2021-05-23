import 'mocha';
import { expect } from 'chai';

import { Api } from './index';

describe('Тестирование Api', () => {
  it('signIn тест', function (done) {
    const api = new Api();
    api.signIn({ data: { login: 'KarabasAE', password: '123' } }).then((res) => {
      // console.log(res);
      if (res.ok) {
        done();
      } else done(res.json());
    });
  });
});
