'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _coerce = require('./coerce');

var _coerce2 = _interopRequireDefault(_coerce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterRecord = (0, _immutable.Record)({
  // string id of the presenter
  id: null,
  // type of the presenter
  type: null,
  // Map from string keys to formulas intended to be evaluated against spreadsheet data
  mapData: new _immutable.Map(),
  // Array data query
  arrayData: null,
  // Arbitrary key/value pairs provided to the presenter
  config: new _immutable.Map()
}, 'Presenter');

var coercer = _coerce2.default.bind(null, new _immutable.Map({
  id: function id(_id) {
    return !!_id ? '' + _id : null;
  },
  type: function type(_type) {
    return !!_type ? '' + _type : null;
  },
  mapData: function mapData(_mapData) {
    return !!_mapData ? new _immutable.Map(_mapData) : null;
  },
  arrayData: function arrayData(_arrayData) {
    return !!_arrayData ? '' + _arrayData : null;
  },
  config: function config(_config) {
    return !!_config ? (0, _immutable.fromJS)(_config) : null;
  }
}));

var Presenter = function (_PresenterRecord) {
  _inherits(Presenter, _PresenterRecord);

  function Presenter(params) {
    _classCallCheck(this, Presenter);

    return _possibleConstructorReturn(this, (Presenter.__proto__ || Object.getPrototypeOf(Presenter)).call(this, coercer(params)));
  }

  return Presenter;
}(PresenterRecord);

exports.default = Presenter;
//# sourceMappingURL=presenter.js.map