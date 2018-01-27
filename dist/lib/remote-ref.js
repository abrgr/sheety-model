'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoteRefRecord = (0, _immutable.Record)({
  collection: null,
  documentIdTemplate: null,
  jsonPathTemplate: null,
  aggregationMethod: null
}, 'RemoteRef');

var RemoteRef = function (_RemoteRefRecord) {
  _inherits(RemoteRef, _RemoteRefRecord);

  function RemoteRef() {
    _classCallCheck(this, RemoteRef);

    return _possibleConstructorReturn(this, (RemoteRef.__proto__ || Object.getPrototypeOf(RemoteRef)).apply(this, arguments));
  }

  return RemoteRef;
}(RemoteRefRecord);

exports.default = RemoteRef;
//# sourceMappingURL=remote-ref.js.map