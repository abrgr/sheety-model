import { Record, List } from 'immutable';
import CellRef from './cell-ref';

const TabRecord = Record({
  id: null,
  name: null,
  isVisible: false,
  rows: new List()
}, 'Tab');

export default class Tab extends TabRecord {
  getCellByA1Ref(ref) {
    return this.getCellByRef(CellRef.fromTabAndA1Ref(this, ref));
  }

  getCell(row, col) {
    return this.getIn(['rows', row, col]);
  }

  getCellByRef(ref) {
    return ref.get('tabId') === this.get('id')
         ? this.getCell(ref.get('rowIdx'), ref.get('colIdx'))
         : null;
  }
}
