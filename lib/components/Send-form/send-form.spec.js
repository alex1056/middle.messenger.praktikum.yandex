"use strict";

var _chai = require("chai");

var _index = require("./index");

describe('Тест render ф. в SendForm', function () {
  it('должен быть возвращен html', function () {
    var sendForm = new _index.SendForm();
    (0, _chai.expect)(sendForm.render().indexOf('<form class="msgs__footer" id="send-msg-form">')).is.equal(0);
  });
});