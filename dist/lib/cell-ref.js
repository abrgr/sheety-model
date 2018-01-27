'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _hotFormulaParser = require('hot-formula-parser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellRefRecord = (0, _immutable.Record)({
  tabId: null,
  rowIdx: null,
  colIdx: null
});

var CellRef = function (_CellRefRecord) {
  _inherits(CellRef, _CellRefRecord);

  function CellRef() {
    _classCallCheck(this, CellRef);

    return _possibleConstructorReturn(this, (CellRef.__proto__ || Object.getPrototypeOf(CellRef)).apply(this, arguments));
  }

  _createClass(CellRef, [{
    key: 'toA1Ref',
    value: function toA1Ref() {
      return (0, _hotFormulaParser.toLabel)({ index: this.get('rowIdx') }, { index: this.get('colIdx') }, this.get('tabId'));
    }
  }], [{
    key: 'fromTabAndA1Ref',
    value: function fromTabAndA1Ref(tab, ref) {
      var _extractLabel = (0, _hotFormulaParser.extractLabel)(ref),
          _extractLabel2 = _slicedToArray(_extractLabel, 2),
          row = _extractLabel2[0],
          col = _extractLabel2[1];

      var rowIdx = row.index;
      var colIdx = col.index;

      return new CellRef({
        rowIdx: rowIdx,
        colIdx: colIdx,
        tabId: tab.get('id')
      });
    }
  }, {
    key: 'fromA1Ref',
    value: function fromA1Ref(ref) {
      var _extractLabel3 = (0, _hotFormulaParser.extractLabel)(ref),
          _extractLabel4 = _slicedToArray(_extractLabel3, 3),
          row = _extractLabel4[0],
          col = _extractLabel4[1],
          tabId = _extractLabel4[2];

      var rowIdx = row.index;
      var colIdx = col.index;

      return new CellRef({
        rowIdx: rowIdx,
        colIdx: colIdx,
        tabId: tabId
      });
    }
  }, {
    key: 'of',
    value: function of(tab, rowIdx, colIdx) {
      return new CellRef({
        tabId: tab.get('id'),
        rowIdx: rowIdx,
        colIdx: colIdx
      });
    }
  }]);

  return CellRef;
}(CellRefRecord);

exports.default = CellRef;
//# sourceMappingURL=cell-ref.js.map