import { Record } from 'immutable';
import { extractLabel, toLabel } from 'hot-formula-parser';

const CellRefRecord = Record({
  tabId: null,
  rowIdx: null,
  colIdx: null
});

export default class CellRef extends CellRefRecord {
  static fromTabAndA1Ref(tab, ref) {
    const [row, col] = extractLabel(ref);
    const rowIdx = row.index;
    const colIdx = col.index;

    return new CellRef({
      rowIdx,
      colIdx,
      tabId: tab.get('id')
    });
  }

  static fromA1Ref(ref) {
    const [row, col, tabId] = extractLabel(ref);
    const rowIdx = row.index;
    const colIdx = col.index;

    return new CellRef({
      rowIdx,
      colIdx,
      tabId
    });
  }

  static of(tab, rowIdx, colIdx) {
    return new CellRef({
      tabId: tab.get('id'),
      rowIdx,
      colIdx
    });
  }

  toA1Ref() {
    return toLabel(
      { index: this.get('rowIdx') },
      { index: this.get('colIdx') },
      this.get('tabId')
    );
  }
}
