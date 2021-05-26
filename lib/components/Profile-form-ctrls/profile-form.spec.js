"use strict";

var _chai = require("chai");

var _index = require("./index");

describe('Тест render ф. в ProfileFormCtrls', function () {
  it('должен быть возвращен html', function () {
    var profileFormCtrls = new _index.ProfileFormCtrls({});
    (0, _chai.expect)(profileFormCtrls.render().indexOf('<div class="pform__ctrls-container">')).is.equal(0);
  });
});