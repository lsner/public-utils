'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./deepCopy/index');

Object.defineProperty(exports, 'deepCopy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = require('./call/index');

Object.defineProperty(exports, 'myCall', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _index3 = require('./new/index');

Object.defineProperty(exports, 'myNew', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index3).default;
  }
});

var _index4 = require('./apply/index');

Object.defineProperty(exports, 'myApply', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index4).default;
  }
});

var _index5 = require('./bind/index');

Object.defineProperty(exports, 'myBind', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index5).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }