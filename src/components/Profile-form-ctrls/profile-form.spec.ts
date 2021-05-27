import { expect } from 'chai';
import { ProfileFormCtrls } from './index';

describe('Тест render ф. в ProfileFormCtrls', () => {
  it('должен быть возвращен html', () => {
    const profileFormCtrls = new ProfileFormCtrls({});

    expect(profileFormCtrls.render().indexOf('<div class="pform__ctrls-container">')).is.equal(0);
  });
});
