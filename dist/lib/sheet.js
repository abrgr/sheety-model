'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Sheet = function (_SheetRecord) {
  _inherits(Sheet, _SheetRecord);

  function Sheet(_ref) {
    var tabs = _ref.tabs,
        tabsById = _ref.tabsById;

    _classCallCheck(this, Sheet);

    return _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).call(this, !tabsById && !!tabs ? {
      tabsById: new _immutable.List(tabs).groupBy(function (t) {
        return t.get('id');
      }).map(function (t) {
        return t.first();
      })
    } : {
      tabsById: tabsById
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
  }]);

  return Sheet;
}(SheetRecord);

exports.default = Sheet;
//# sourceMappingURL=sheet.js.map