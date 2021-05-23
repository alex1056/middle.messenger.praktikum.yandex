import { expect } from 'chai';
import { PopupUserMenu } from './index';

describe('Тест render ф. в Popup-user-menu', () => {
  it('должен быть возвращен html', () => {
    const popupUserMenu = new PopupUserMenu({});
    // console.log(profileFormCtrls);
    // console.log(popupUserMenu.render());
    expect(popupUserMenu.render().indexOf('<div class="popup popup_visible popup_msg" id="user-menu-popup">')).is.equal(
      0,
    );
  });
});
