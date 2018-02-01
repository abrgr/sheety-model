'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PresenterRecord = (0, _immutable.Record)({
  // string id of the presenter
  id: null,
  // Map from string keys to formulas intended to be evaluated against spreadsheet data
  mapDataQuery: new _immutable.Map(),
  // Array data query
  arrayDataQuery: new _immutable.List(),
  // Arbitrary key/value pairs provided to the presenter
  config: new _immutable.Map()
}, 'Presenter');

var Presenter = function (_PresenterRecord) {
  _inherits(Presenter, _PresenterRecord);

  function Presenter(params) {
    _classCallCheck(this, Presenter);

    var _ref = _immutable.Iterable.isIterable(params) ? [params.get('id'), params.get('mapDataQuery'), params.get('arrayDataQuery'), params.get('config')] : [params.id, params.mapDataQuery, params.arrayDataQuery, params.config],
        _ref2 = _slicedToArray(_ref, 4),
        id = _ref2[0],
        mapDataQuery = _ref2[1],
        arrayDataQuery = _ref2[2],
        config = _ref2[3];

    return _possibleConstructorReturn(this, (Presenter.__proto__ || Object.getPrototypeOf(Presenter)).call(this, {
      id: !!id ? '' + id : null,
      mapDataQuery: !!mapDataQuery ? new _immutable.Map(mapDataQuery) : null,
      arrayDataQuery: !!arrayDataQuery ? new _immutable.List(arrayDataQuery) : null,
      config: !!config ? new _immutable.Map(config) : null
    }));
  }

  return Presenter;
}(PresenterRecord);

exports.default = Presenter;
//# sourceMappingURL=presenter.js.map