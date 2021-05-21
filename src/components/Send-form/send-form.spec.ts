// import { expect } from 'chai';

import { SendForm } from './index';

describe('Тест render ф. в SendForm', () => {
  it('должно быть возвращен html', () => {
    // expect(hello('mocha'), 'Hello mocha');
    const sendForm = new SendForm();
    expect(sendForm.render()).is.equal('');
  });
});
