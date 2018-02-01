import { Record, Iterable } from 'immutable';
import CellRef from './cell-ref';

const CellRefRangeRecord = Record({
  start: null,
  end: null
});

export default class CellRefRange extends CellRefRangeRecord {
  constructor(params) {
    const [start, end] = Iterable.isIterable(params)
                       ? [params.get('start'), params.get('end')]
                       : [params.start, params.end];
    super({
      start: new CellRef(start),
      end: new CellRef(end)
    });
  }

  static of(tab, startRow, startCol, endRow, endCol) {
    return new CellRef({
      start: CellRef.of(tab, startRow, startCol),
      end: CellRef.of(tab, endRow, endCol)
    });
  }
}
