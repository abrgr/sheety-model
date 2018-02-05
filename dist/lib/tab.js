'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

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

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  id: function id(_id) {
    return '' + _id;
  },
  name: function name(_name) {
    return '' + _name;
  },
  isVisible: function isVisible(_isVisible) {
    return !!_isVisible;
  },
  rows: function rows(_rows) {
    return !!_rows ? coerceRows(_rows) : new _immutable.List();
  }
}));

var Tab = function (_TabRecord) {
  _inherits(Tab, _TabRecord);

  function Tab(params) {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, coercer(params)));
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