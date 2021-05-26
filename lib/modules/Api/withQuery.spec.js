"use strict";

require("mocha");

var _chai = require("chai");

var _index = require("./index");

describe('queryParams', function () {
  it('простой объект', function () {
    var obj = {
      a: 1
    };
    var result = (0, _index.queryParams)(obj);
    (0, _chai.expect)(result).to.equal('a=1');
  });
  it('простые типы', function () {
    var obj = {
      a: 1,
      b: '2',
      c: true,
      d: false,
      e: null
    };
    var result = (0, _index.queryParams)(obj);
    (0, _chai.expect)(result).to.equal('a=1&b=2&c=true&d=false&e=null');
  });
  it('undefined', function () {
    var obj = {
      a: undefined
    };
    var result = (0, _index.queryParams)(obj);
    (0, _chai.expect)(result).to.equal('');
  });
});