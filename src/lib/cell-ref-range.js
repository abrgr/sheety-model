import { Map, Record } from 'immutable';
import CellRef from './cell-ref';
import coerce from './coerce';

const CellRefRangeRecord = Record({
  start: null,
  end: null
});

const coercer = coerce.bind(null, new Map({
  start: (start) => new CellRef(start),
  end: (end) => new CellRef(end)
}));

export default class CellRefRange extends CellRefRangeRecord {
  constructor(params) {
    super(coercer(params));
  }

  static of(tab, startRow, startCol, endRow, endCol) {
    return new CellRefRange({
      start: CellRef.of(tab, startRow, startCol),
      end: CellRef.of(tab, endRow, endCol)
    });
  }
}
