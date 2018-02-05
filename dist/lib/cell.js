'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _remoteRef = require('./remote-ref');

var _remoteRef2 = _interopRequireDefault(_remoteRef);

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellRecord = (0, _immutable.Record)({
  staticValue: null,
  formula: null,
  isUserEditable: false,
  remoteValue: new _remoteRef2.default(),
  link: null
}, 'Cell');

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  staticValue: function staticValue(_staticValue) {
    return _staticValue;
  },
  formula: function formula(_formula) {
    return !!_formula ? '' + _formula : null;
  },
  isUserEditable: function isUserEditable(_isUserEditable) {
    return !!_isUserEditable;
  },
  remoteValue: function remoteValue(_remoteValue) {
    return !!_remoteValue ? new _remoteRef2.default(_remoteValue) : null;
  },
  link: function link(_link) {
    return !!_link ? '' + _link : null;
  }
}));

var Cell = function (_CellRecord) {
  _inherits(Cell, _CellRecord);

  function Cell(params) {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, coercer(params)));
  }

  return Cell;
}(CellRecord);

exports.default = Cell;
//# sourceMappingURL=cell.js.map