import { Map, Record } from 'immutable';
import CellFormat from './cell-format';
import coerce from './coerce';

const CellRecord = Record({
  staticValue: null,
  formula: null,
  format: new CellFormat()
}, 'Cell');

const coercer = coerce.bind(null, new Map({
  staticValue: (staticValue) => staticValue,
  formula: (formula) => !!formula ? ('' + formula) : null,
  format: format => new CellFormat(format)
}));

export default class Cell extends CellRecord {
  constructor(params) {
    super(coercer(params));
  }
}
