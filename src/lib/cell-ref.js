import { Record } from 'immutable';

const CellRefRecord = Record({
  tabId: null,
  rowIdx: null,
  colIdx: null
});

export default class CellRef extends CellRefRecord {
  static fromTabAndA1Ref(tab, ref) {
    // an absolute ref in excel looks like $A$4, $A4, or A$4.
    // we want to see A4
    const directRef = ref.replace(/[$]/g, '');
    const parts = /^([A-Za-z]+)([0-9]+)$/.exec(directRef);
    if ( !parts ) {
      return null;
    }

    // these are 1-indexed
    const colIdx = base26Decode(parts[1]) - 1;
    const rowIdx = parseInt(parts[2], 10) - 1;

    return new CellRef({
      rowIdx,
      colIdx,
      tabId: tab.get('id')
    });
  }

  static of(tab, rowIdx, colIdx) {
    return new CellRef({
      tabId: tab.get('id'),
      rowIdx,
      colIdx
    });
  }
}

function base26Decode(b26) {
  const toDecode = b26.toLowerCase();
  const aCharCode = 'a'.charCodeAt(0) - 1; // subtract 1 to make 'a' 1 instead of 0
  let val = 0;
  let len = toDecode.length;
  for ( let idx = 0; idx < len; ++idx ) {
    val = (val * 26) + (toDecode.charCodeAt(idx) - aCharCode)
  }

  return val;
}
