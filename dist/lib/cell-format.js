'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _toJSValue = Object.freeze({
  TEXT: function TEXT(val) {
    return '' + val;
  },
  NUMBER: function NUMBER(val) {
    return +val;
  },
  PERCENT: function PERCENT(val) {
    return +val;
  },
  CURRENCY: function CURRENCY(val) {
    return +val;
  },
  DATE: function DATE(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss');
  },
  TIME: function TIME(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss');
  }, // TODO: is this right?
  DATE_TIME: function DATE_TIME(val) {
    return (0, _moment2.default)(_ssf2.default.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss');
  },
  SCIENTIFIC: function SCIENTIFIC(val) {
    return +val;
  }
});

var toNum = function toNum(val) {
  return +val;
};
var toStr = function toStr(val) {
  return '' + val;
};

var toFormatableValue = Object.freeze({
  TEXT: toStr,
  NUMBER: toNum,
  PERCENT: toNum,
  CURRENCY: toNum,
  DATE: toNum,
  TIME: toNum,
  DATE_TIME: toNum,
  SCIENTIFIC: toNum
});

var userEnteredValueToSheetValue = Object.freeze({
  TEXT: function TEXT(val) {
    return '' + val;
  },
  NUMBER: function NUMBER(val) {
    return +val;
  },
  PERCENT: function PERCENT(val) {
    return 100 * +val;
  },
  CURRENCY: function CURRENCY(val) {
    var match = /[0-9]*[.,][0-9]*/.exec('' + val);
    if (!match) {
      return NaN;
    }
    return parseFloat(match[0]);
  },
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
    return +val;
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
      return valueOf ? _ssf2.default.format(this.get('pattern'), valueOf(val)) : val;
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