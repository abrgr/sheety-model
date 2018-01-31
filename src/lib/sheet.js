import { Record, Map, List } from 'immutable';
import Tab from './tab';
import CellRef from './cell-ref';

const SheetRecord = Record({
  tabsById: new Map()
}, 'Sheet');

export default class Sheet extends SheetRecord {
  constructor({ tabs, tabsById }) {
    super(
      ( !tabsById && !! tabs )
      ? {
        tabsById: new List(tabs).groupBy(t => t.get('id')).map(t => t.first())
      } : {
        tabsById
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
}
