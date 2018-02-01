'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _immutable = require('immutable');

var _remoteRef = require('./remote-ref');

var _remoteRef2 = _interopRequireDefault(_remoteRef);

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

var Cell = function (_CellRecord) {
  _inherits(Cell, _CellRecord);

  function Cell(params) {
    _classCallCheck(this, Cell);

    var _ref = _immutable.Iterable.isIterable(params) ? [params.get('staticValue'), params.get('formula'), params.get('isUserEditable'), params.get('remoteValue'), params.get('link')] : [params.staticValue, params.formula, params.isUserEditable, params.remoteValue, params.link],
        _ref2 = _slicedToArray(_ref, 5),
        staticValue = _ref2[0],
        formula = _ref2[1],
        isUserEditable = _ref2[2],
        remoteValue = _ref2[3],
        link = _ref2[4];

    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, {
      staticValue: staticValue,
      formula: !!formula ? '' + formula : null,
      isUserEditable: !!isUserEditable,
      remoteValue: !!remoteValue ? new _remoteRef2.default(remoteValue) : null,
      link: !!link ? '' + link : null
    }));
  }

  return Cell;
}(CellRecord);

exports.default = Cell;
//# sourceMappingURL=cell.js.map