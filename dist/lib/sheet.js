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

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SheetRecord = (0, _immutable.Record)({
  providerId: null,
  providerUrl: null,
  title: null,
  tabsById: new _immutable.Map()
}, 'Sheet');

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  providerId: function providerId(_providerId) {
    return !!_providerId ? '' + _providerId : null;
  },
  providerUrl: function providerUrl(_providerUrl) {
    return !!_providerUrl ? '' + _providerUrl : null;
  },
  title: function title(_title) {
    return !!_title ? '' + _title : null;
  },
  tabsById: function tabsById(_tabsById) {
    return new _immutable.Map(_tabsById).map(function (tab) {
      return new _tab2.default(tab);
    });
  }
}));

var Sheet = function (_SheetRecord) {
  _inherits(Sheet, _SheetRecord);

  function Sheet(params) {
    _classCallCheck(this, Sheet);

    var tabs = params && _immutable.Iterable.isIterable(params) ? params.get('tabs') : params.tabs;

    return _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).call(this, coercer(tabs ? new _immutable.Map(params).merge({
      tabsById: new _immutable.List(tabs).groupBy(function (t) {
        return t.get('id');
      }).map(function (t) {
        return t.first();
      })
    }) : params)));
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
      return cellRefRange.mapCellRefs(xform);
    }
  }]);

  return Sheet;
}(SheetRecord);

exports.default = Sheet;
//# sourceMappingURL=sheet.js.map