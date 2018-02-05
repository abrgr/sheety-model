'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mappers, params) {
  if (!params) {
    return null;
  }

  var isIterable = _immutable.Iterable.isIterable(params);

  return mappers.map(function (mapper, key) {
    return mapper(isIterable ? params.get(key) : params[key]);
  });
};

var _immutable = require('immutable');
//# sourceMappingURL=coerce.js.map