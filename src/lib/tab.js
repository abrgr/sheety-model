import { Map, Record, List } from 'immutable';
import CellRef from './cell-ref';
import Cell from './cell';
import coerce from './coerce';

const TabRecord = Record({
  id: null,
  name: null,
  isVisible: false,
  rows: new List()
}, 'Tab');

const coercer = coerce.bind(null, new Map({
  id: id => '' + id,
  name: name => '' + name,
  isVisible: isVisible => !!isVisible,
  rows: rows => !!rows ? coerceRows(rows) : new List()
}));

export default class Tab extends TabRecord {
  constructor(params) {
    super(coercer(params));
  }

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

function coerceRows(rows) {
  return new List(rows).map((row) => (
    !!row ? coerceRow(row) : new List()
  ));
}

function coerceRow(row) {
  return new List(row).map((cell) => ( 
    !!cell ? new Cell(cell) : new Cell()
  ));
}
