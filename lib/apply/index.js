'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


Function.prototype.myApply = function (obj) {
  obj = obj || window;
  obj.fn = this;

  var args = Array.prototype.slice.call(arguments, 1);
  var _args = args.join();
  var result = eval('obj.fn(' + _args + ')');

  delete obj.fn;

  return result;
};

exports.default = Function.prototype.myApply;