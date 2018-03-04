import { Map, Record } from 'immutable';
import { extractLabel, toLabel } from 'hot-formula-parser';
import coerce from './coerce';

const CellRefRecord = Record({
  tabId: null,
  rowIdx: null,
  colIdx: null
});

const coercer = coerce.bind(null, new Map({
  tabId: (tabId) => tabId ? ('' + tabId) : null,
  rowIdx: (rowIdx) => 0|rowIdx,
  colIdx: (colIdx) => 0|colIdx
}));

export default class CellRef extends CellRefRecord {
  constructor(params) {
    super(coercer(params));
  }

  static fromTabAndA1Ref(tab, ref) {
    const [row, col] = extractLabel(ref);

    if ( !row || !col ) {
      return null;
    }

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

    if ( !row || !col ) {
      return null;
    }

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

  toA1RefWithoutTab() {
    return toLabel(
      { index: this.get('rowIdx') },
      { index: this.get('colIdx') }
    );
  }

  whenValid(fn) {
    if ( this.get('tabId') ) {
      return fn(this.get('tabId'), this.get('colIdx'), this.get('rowIdx'));
    }
  }
}
