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

  static fromA1Ref(ref) {
    // the structure of a ref is <tab><from ref>:<to ref>
    // <tab> may include a colon so the final colon must be the separator
    const lastColonIdx = ref.lastIndexOf(':');
    const from = ref.slice(0, lastColonIdx);
    const to = ref.slice(lastColonIdx + 1);

    const start = CellRef.fromA1Ref(from);
    const end = CellRef.fromA1Ref(to).set('tabId', start.get('tabId'));

    return new CellRefRange({
      start,
      end
    });
  }

  mapCellRefs(xform) {
    const start = this.get('start');
    const end = this.get('end');
    const tab = start.get('tabId');
    const startRow = start.get('rowIdx');
    const endRow = end.get('rowIdx');
    const startCol = start.get('colIdx');
    const endCol = end.get('colIdx');

    const vals = [];
    for ( let rowIdx = startRow; rowIdx <= endRow; ++rowIdx ) {
      vals.push([]);
      for ( let colIdx = startCol; colIdx <= endCol; ++colIdx ) {
        vals[rowIdx - startRow][colIdx - startCol] = xform(start.merge({ rowIdx, colIdx }));
      }
    }

    return vals;
  }
}
