'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellRefRangeRecord = (0, _immutable.Record)({
  start: null,
  end: null
});

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  start: function start(_start) {
    return new _cellRef2.default(_start);
  },
  end: function end(_end) {
    return new _cellRef2.default(_end);
  }
}));

var CellRefRange = function (_CellRefRangeRecord) {
  _inherits(CellRefRange, _CellRefRangeRecord);

  function CellRefRange(params) {
    _classCallCheck(this, CellRefRange);

    return _possibleConstructorReturn(this, (CellRefRange.__proto__ || Object.getPrototypeOf(CellRefRange)).call(this, coercer(params)));
  }

  _createClass(CellRefRange, null, [{
    key: 'of',
    value: function of(tab, startRow, startCol, endRow, endCol) {
      return new CellRefRange({
        start: _cellRef2.default.of(tab, startRow, startCol),
        end: _cellRef2.default.of(tab, endRow, endCol)
      });
    }
  }, {
    key: 'fromA1Ref',
    value: function fromA1Ref(ref) {
      // the structure of a ref is <tab><from ref>:<to ref>
      // <tab> may include a colon so the final colon must be the separator
      var lastColonIdx = ref.lastIndexOf(':');
      var from = ref.slice(0, lastColonIdx);
      var to = ref.slice(lastColonIdx + 1);

      var start = _cellRef2.default.fromA1Ref(from);
      var end = _cellRef2.default.fromA1Ref(to).set('tabId', start.get('tabId'));

      return new CellRefRange({
        start: start,
        end: end
      });
    }
  }]);

  return CellRefRange;
}(CellRefRangeRecord);

exports.default = CellRefRange;
//# sourceMappingURL=cell-ref-range.js.map