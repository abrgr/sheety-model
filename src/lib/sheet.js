import { Record, Map, List, Iterable } from 'immutable';
import Tab from './tab';
import CellRef from './cell-ref';

const SheetRecord = Record({
  tabsById: new Map()
}, 'Sheet');

function coerceTabsById(tabsById) {
  return new Map(tabsById).map(tab => new Tab(tab));
}

export default class Sheet extends SheetRecord {
  constructor(params) {
    const [tabs, tabsById] = Iterable.isIterable(params)
                           ? [params.get('tabs'), params.get('tabsById')]
                           : [params.tabs, params.tabsById];
    super(
      ( !tabsById && !!tabs )
      ? {
        tabsById: coerceTabsById(new List(tabs).groupBy(t => t.get('id')).map(t => t.first()))
      } : {
        tabsById: coerceTabsById(tabsById)
      }
    );
  }

  /**
   * Return all cell references for all tabs.
   **/
  allCellRefs() {
    return this.tabsById.valueSeq().flatMap(tab => (
      tab.rows.flatMap((row, rowIdx) => (
        row.map((cell, colIdx) => CellRef.of(tab, rowIdx, colIdx))
      ))
    ));
  }

  /**
   * Returns the sheety-model Cell for the given cell ref.
   **/
  getCell(cellRef) {
    const tab = this.getIn(['tabsById', cellRef.get('tabId')]);
    return tab && tab.getCellByRef(cellRef);
  }

  getTab(tabId) {
    return this.getIn(['tabsById', tabId]);
  }

  mapRange(cellRefRange, xform) {
    const start = cellRefRange.get('start');
    const end = cellRefRange.get('end');
    const tab = start.get('tabId');
    const rows = end.get('rowIdx') - start.get('rowIdx');
    const cols = end.get('colIdx') - start.get('colIdx');

    const vals = [];
    for ( let r = 0; r <= rows; ++r ) {
      vals.push([]);
      for ( let c = 0; c <= cols; ++c ) {
        vals[r][c] = xform(start.merge({rowIdx: r, colIdx: c}));
      }
    }

    return vals;
  }
}
