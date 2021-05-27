import 'mocha';

import { Api } from './index';

describe('Тестирование Api', () => {
  it('signIn тест', function (done) {
    const api = new Api();
    api.signIn({ data: { login: 'KarabasAE', password: '123' } }).then((res: any) => {
      if (res.ok) {
        done();
      } else done(res.json());
    });
  });
});
