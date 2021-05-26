"use strict";

var _chai = require("chai");

var _index = require("./index");

describe('Тест render ф. в Popup-user-menu', function () {
  it('должен быть возвращен html', function () {
    var popupUserMenu = new _index.PopupUserMenu({});
    (0, _chai.expect)(popupUserMenu.render().indexOf('<div class="popup popup_visible popup_msg" id="user-menu-popup">')).is.equal(0);
  });
});