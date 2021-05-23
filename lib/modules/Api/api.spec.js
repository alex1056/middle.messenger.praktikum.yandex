"use strict";

require("mocha");

var _index = require("./index");

describe('Тестирование Api', function () {
  it('signIn тест', function (done) {
    var api = new _index.Api();
    api.signIn({
      data: {
        login: 'KarabasAE',
        password: '123'
      }
    }).then(function (res) {
      // console.log(res);
      if (res.ok) {
        done();
      } else done(res.json());
    });
  });
});