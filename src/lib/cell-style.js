import { Record } from 'immutable';

const CellStyleRecord = Record({
  color: "",
  backgroundColor: "",
  formatter: (x) => x,
  isBold: false,
  isUnderlined: false,
  isItalic: false
}, 'CellStyle');

export default class CellStyle extends CellStyleRecord { }
