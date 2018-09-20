'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index');

Function.prototype.myApply = function (obj) {
  obj = obj || window;
  obj.fn = this;

  var _arguments = (0, _index.deepCopy)(arguments);
  var args = [];
  args = args.concat(_arguments[1]);
  var _args = args.join();
  var result = eval('obj.fn(' + _args + ')');

  delete obj.fn;

  return result;
};

exports.default = Function.prototype.myApply;