'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _cellRef = require('./cell-ref');

var _cellRef2 = _interopRequireDefault(_cellRef);

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

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
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
//# sourceMappingURL=tab.js.map