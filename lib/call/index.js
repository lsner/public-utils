'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index');

Function.prototype.myCall = function (obj) {
  obj = obj || window;

  obj.fn = this;

  var _arguments = (0, _index.deepCopy)(arguments);
  delete _arguments[0];
  var args = [];
  for (var key in _arguments) {
    args.push(_arguments[key]);
  }
  var args_str = args.join();
  // obj.fn(args_str) 这种做法显然不行 相当于只传进了一个字符串

  var result = eval('obj.fn(' + args_str + ')');

  delete obj.fn;

  return result;
};

exports.default = Function.prototype.myCall;