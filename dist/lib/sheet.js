'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _tab = require('./tab');

var _tab2 = _interopRequireDefault(_tab);

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SheetRecord = (0, _immutable.Record)({
  tabsById: new _immutable.Map()
}, 'Sheet');

function coerceTabsById(tabsById) {
  return new _immutable.Map(tabsById).map(function (tab) {
    return new _tab2.default(tab);
  });
}

var Sheet = function (_SheetRecord) {
  _inherits(Sheet, _SheetRecord);

  function Sheet(params) {
    _classCallCheck(this, Sheet);

    var _ref = _immutable.Iterable.isIterable(params) ? [params.get('tabs'), params.get('tabsById')] : [params.tabs, params.tabsById],
        _ref2 = _slicedToArray(_ref, 2),
        tabs = _ref2[0],
        tabsById = _ref2[1];

    return _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).call(this, !tabsById && !!tabs ? {
      tabsById: coerceTabsById(new _immutable.List(tabs).groupBy(function (t) {
        return t.get('id');
      }).map(function (t) {
        return t.first();
      }))
    } : {
      tabsById: coerceTabsById(tabsById)
    }));
  }

  /**
   * Return all cell references for all tabs.
   **/


  _createClass(Sheet, [{
    key: 'allCellRefs',
    value: function allCellRefs() {
      return this.tabsById.valueSeq().flatMap(function (tab) {
        return tab.rows.flatMap(function (row, rowIdx) {
          return row.map(function (cell, colIdx) {
            return _cellRef2.default.of(tab, rowIdx, colIdx);
          });
        });
      });
    }

    /**
     * Returns the sheety-model Cell for the given cell ref.
     **/

  }, {
    key: 'getCell',
    value: function getCell(cellRef) {
      var tab = this.getIn(['tabsById', cellRef.get('tabId')]);
      return tab && tab.getCellByRef(cellRef);
    }
  }, {
    key: 'getTab',
    value: function getTab(tabId) {
      return this.getIn(['tabsById', tabId]);
    }
  }, {
    key: 'mapRange',
    value: function mapRange(cellRefRange, xform) {
      var start = cellRefRange.get('start');
      var end = cellRefRange.get('end');
      var tab = start.get('tabId');
      var rows = end.get('rowIdx') - start.get('rowIdx');
      var cols = end.get('colIdx') - start.get('colIdx');

      var vals = [];
      for (var r = 0; r <= rows; ++r) {
        vals.push([]);
        for (var c = 0; c <= cols; ++c) {
          vals[r][c] = xform(start.merge({ rowIdx: r, colIdx: c }));
        }
      }

      return vals;
    }
  }]);

  return Sheet;
}(SheetRecord);

exports.default = Sheet;
//# sourceMappingURL=sheet.js.map