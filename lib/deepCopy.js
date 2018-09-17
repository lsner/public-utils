'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * @param obj
 * @returns {*}
 */
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  if (Array.isArray(obj)) {
    result = obj.slice();
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (_typeof(obj[key]) === 'object') {
          result[key] = deepCopy(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
  }
  return result;
}

exports.default = deepCopy;