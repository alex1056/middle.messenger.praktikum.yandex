"use strict";

var _chai = require("chai");

var _hello = _interopRequireDefault(require("./hello"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Typescript + Babel usage suite', function () {
  it('should return string correctly1', function () {
    (0, _chai.expect)((0, _hello["default"])('mocha'), '1Hello mocha');
  });
});