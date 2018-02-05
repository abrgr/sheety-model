'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabRecord = (0, _immutable.Record)({
  id: null,
  name: null,
  isVisible: false,
  rows: new _immutable.List()
}, 'Tab');

var Tab = function (_TabRecord) {
  _inherits(Tab, _TabRecord);

  function Tab(params) {
    _classCallCheck(this, Tab);

    var _ref = _immutable.Iterable.isIterable(params) ? [params.get('id'), params.get('name'), params.get('isVisible'), params.get('rows')] : [params.id, params.name, params.isVisible, params.rows],
        _ref2 = _slicedToArray(_ref, 4),
        id = _ref2[0],
        name = _ref2[1],
        isVisible = _ref2[2],
        rows = _ref2[3];

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, {
      id: '' + id,
      name: '' + name,
      isVisible: !!isVisible,
      rows: !!rows ? coerceRows(rows) : new _immutable.List()
    }));
  }

  _createClass(Tab, [{
    key: 'getCellByA1Ref',
    value: function getCellByA1Ref(ref) {
      return this.getCellByRef(_cellRef2.default.fromTabAndA1Ref(this, ref));
    }
  }, {
    key: 'getCell',
    value: function getCell(row, col) {
      return this.getIn(['rows', row, col]);
    }
  }, {
    key: 'getCellByRef',
    value: function getCellByRef(ref) {
      return ref.get('tabId') === this.get('id') ? this.getCell(ref.get('rowIdx'), ref.get('colIdx')) : null;
    }
  }]);

  return Tab;
}(TabRecord);

exports.default = Tab;


function coerceRows(rows) {
  return new _immutable.List(rows).map(function (row) {
    return !!row ? coerceRow(row) : new _immutable.List();
  });
}

function coerceRow(row) {
  return new _immutable.List(row).map(function (cell) {
    return !!cell ? new _cell2.default(cell) : new _cell2.default();
  });
}
//# sourceMappingURL=tab.js.map