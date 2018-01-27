"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require("immutable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellStyleRecord = (0, _immutable.Record)({
  color: "",
  backgroundColor: "",
  formatter: function formatter(x) {
    return x;
  },
  isBold: false,
  isUnderlined: false,
  isItalic: false
}, 'CellStyle');

var CellStyle = function (_CellStyleRecord) {
  _inherits(CellStyle, _CellStyleRecord);

  function CellStyle() {
    _classCallCheck(this, CellStyle);

    return _possibleConstructorReturn(this, (CellStyle.__proto__ || Object.getPrototypeOf(CellStyle)).apply(this, arguments));
  }

  return CellStyle;
}(CellStyleRecord);

exports.default = CellStyle;
//# sourceMappingURL=cell-style.js.map