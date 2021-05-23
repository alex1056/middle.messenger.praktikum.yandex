import { expect } from 'chai';
import { SendForm } from './index';

describe('Тест render ф. в SendForm', () => {
  it('должен быть возвращен html', () => {
    const sendForm = new SendForm();
    expect(sendForm.render().indexOf('<form class="msgs__footer" id="send-msg-form">')).is.equal(0);
  });
});
