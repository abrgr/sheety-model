'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _immutable = require('immutable');

var _ssf = require('ssf');

var _ssf2 = _interopRequireDefault(_ssf);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = Object.freeze({
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  PERCENT: 'PERCENT',
  CURRENCY: 'CURRENCY',
  DATE: 'DATE',
  TIME: 'TIME',
  DATE_TIME: 'DATE_TIME',
  SCIENTIFIC: 'SCIENTIFIC'
});

function isNumericType(type) {
  return type !== types.TEXT;
}

var probablyToNum = function probablyToNum(val) {
  if (typeof val === 'number') {
    return val;
  }

  if (/^(-+)?\d*[.]?\d*$/.exec('' + val)) {
    return +val;
  }

  // probably mis-categorized as a number
  return val;
};
var toStr = function toStr(val) {
  return !!val ? '' + val : '';
};

var _toJSValue = Object.freeze({
  TEXT: toStr,
  NUMBER: probablyToNum,
  PERCENT: probablyToNum,
  CURRENCY: probablyToNum,
  DATE: function DATE(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd', val), 'YYYY-MM-DD');
  },
  TIME: function TIME(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss');
  }, // TODO: is this right?
  DATE_TIME: function DATE_TIME(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss');
  },
  SCIENTIFIC: probablyToNum
});

var toFormatableValue = Object.freeze({
  TEXT: toStr,
  NUMBER: probablyToNum,
  PERCENT: probablyToNum,
  CURRENCY: probablyToNum,
  DATE: probablyToNum,
  TIME: probablyToNum,
  DATE_TIME: probablyToNum,
  SCIENTIFIC: probablyToNum
});

var fromUserEnteredNum = function fromUserEnteredNum(maybeNum) {
  if (typeof maybeNum === 'number') {
    return maybeNum;
  }

  var _$exec = /[-]?\d[\d,.]+|[,.][\d,.]+/.exec(maybeNum),
      _$exec2 = _slicedToArray(_$exec, 1),
      n = _$exec2[0];

  if (!n) {
    return NaN;
  }

  // TODO: we should actually figure out what the locale uses for a decimal separator
  // now, try to guess at a locale to deal with decimals
  var lastComma = n.lastIndexOf(',');
  var lastDecimal = n.lastIndexOf('.');

  if (lastComma > lastDecimal) {
    // we're either European with a decimal or US without a decimal
    if (lastDecimal >= 0) {
      // if we have both, we are much more likely European with a decimal
      return parseFloat(n.replace('.', '').replace(',', '.'));
    }

    // otherwise, we assume we're US
    return parseInt(n.replace(',', ''), 10);
  } else if (lastDecimal > lastComma) {
    // we're either US with a decimal or European without a decimal
    // just assume we're US for now
    return parseFloat(n.replace(',', ''));
  }

  // we have no comma or decimal
  return parseInt(n, 10);
};

var userEnteredValueToSheetValue = Object.freeze({
  TEXT: function TEXT(val) {
    return '' + val;
  },
  NUMBER: fromUserEnteredNum,
  PERCENT: function PERCENT(val) {
    return fromUserEnteredNum(val) / 100;
  },
  CURRENCY: fromUserEnteredNum,
  DATE: function DATE(val) {
    return (0, _moment2.default)(val).diff((0, _moment2.default)('1899-12-30'), 'days');
  },
  TIME: function TIME(val) {
    return (0, _moment2.default)(val);
  }, // TODO: is this right?
  DATE_TIME: function DATE_TIME(val) {
    return (0, _moment2.default)(val).diff((0, _moment2.default)('1899-12-30')) / 86400000;
  },
  SCIENTIFIC: function SCIENTIFIC(val) {
    if (typeof val === 'string' && val.indexOf('e') > 0) {
      return parseFloat(val);
    }

    return fromUserEnteredNum(val);
  }
});

var CellFormatRecord = (0, _immutable.Record)({
  type: types.TEXT,
  pattern: ''
});

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  type: function type(_type) {
    return !!_type && !!types[_type] ? _type : types.TEXT;
  },
  pattern: function pattern(_pattern) {
    return !!_pattern ? _pattern : '';
  }
}));

var CellFormat = function (_CellFormatRecord) {
  _inherits(CellFormat, _CellFormatRecord);

  function CellFormat(params) {
    _classCallCheck(this, CellFormat);

    return _possibleConstructorReturn(this, (CellFormat.__proto__ || Object.getPrototypeOf(CellFormat)).call(this, coercer(params)));
  }

  _createClass(CellFormat, [{
    key: 'format',
    value: function format(val) {
      var valueOf = toFormatableValue[this.get('type')];
      var value = !!valueOf ? valueOf(val) : val;

      var matchingTypes = isNumericType(this.get('type')) ? typeof value === 'number' : typeof value === 'string';

      return matchingTypes ? _ssf2.default.format(this.get('pattern'), value) : val;
    }
  }, {
    key: 'toJSValue',
    value: function toJSValue(val) {
      var valueOf = _toJSValue[this.get('type')];
      return valueOf ? valueOf(val) : val;
    }
  }, {
    key: 'fromUserEnteredValue',
    value: function fromUserEnteredValue(userEnteredValue) {
      var valueOf = userEnteredValueToSheetValue[this.get('type')];
      return valueOf ? valueOf(userEnteredValue) : userEnteredValue;
    }
  }]);

  return CellFormat;
}(CellFormatRecord);

exports.default = CellFormat;


CellFormat.Types = types;
//# sourceMappingURL=cell-format.js.map