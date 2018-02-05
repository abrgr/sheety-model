'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellRefRangeRecord = (0, _immutable.Record)({
  start: null,
  end: null
});

var CellRefRange = function (_CellRefRangeRecord) {
  _inherits(CellRefRange, _CellRefRangeRecord);

  function CellRefRange(params) {
    _classCallCheck(this, CellRefRange);

    var _ref = _immutable.Iterable.isIterable(params) ? [params.get('start'), params.get('end')] : [params.start, params.end],
        _ref2 = _slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return _possibleConstructorReturn(this, (CellRefRange.__proto__ || Object.getPrototypeOf(CellRefRange)).call(this, {
      start: new _cellRef2.default(start),
      end: new _cellRef2.default(end)
    }));
  }

  _createClass(CellRefRange, null, [{
    key: 'of',
    value: function of(tab, startRow, startCol, endRow, endCol) {
      return new CellRefRange({
        start: _cellRef2.default.of(tab, startRow, startCol),
        end: _cellRef2.default.of(tab, endRow, endCol)
      });
    }
  }]);

  return CellRefRange;
}(CellRefRangeRecord);

exports.default = CellRefRange;
//# sourceMappingURL=cell-ref-range.js.map