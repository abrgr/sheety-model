import { Record, List, Iterable } from 'immutable';
import CellRef from './cell-ref';
import Cell from './cell';

const TabRecord = Record({
  id: null,
  name: null,
  isVisible: false,
  rows: new List()
}, 'Tab');

export default class Tab extends TabRecord {
  constructor(params) {
    const [id, name, isVisible, rows]
      = Iterable.isIterable(params)
      ? [params.get('id'), params.get('name'), params.get('isVisible'), params.get('rows')]
      : [params.id, params.name, params.isVisible, params.rows];
    super({
      id: '' + id,
      name: '' + name,
      isVisible: !!isVisible,
      rows: !!rows
          ? coerceRows(rows)
          : new List()
    });
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
