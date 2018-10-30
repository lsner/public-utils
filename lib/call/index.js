'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Function.prototype.myCall = function (obj) {
  obj = obj || window;

  obj.fn = this;

  var args = Array.prototype.slice.call(arguments, 1);
  var args_str = args.join();
  // obj.fn(args_str) 这种做法显然不行 相当于只传进了一个字符串

  var result = eval('obj.fn(' + args_str + ')');

  delete obj.fn;

  return result;
};

exports.default = Function.prototype.myCall;