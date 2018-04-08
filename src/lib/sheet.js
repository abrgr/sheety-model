import { Record, Map, List, Iterable } from 'immutable';
import Tab from './tab';
import CellRef from './cell-ref';
import coerce from './coerce';

const SheetRecord = Record({
  providerId: null,
  providerUrl: null,
  title: null,
  tabsById: new Map()
}, 'Sheet');

const coercer = coerce.bind(null, new Map({
  providerId: providerId => !!providerId ? '' + providerId : null,
  providerUrl: providerUrl => !!providerUrl ? '' + providerUrl : null,
  title: title => !!title ? '' + title : null,
  tabsById: tabsById => new Map(tabsById).map(tab => new Tab(tab))
}));

export default class Sheet extends SheetRecord {
  constructor(params) {
    const tabs = params && Iterable.isIterable(params)
               ? params.get('tabs')
               : params.tabs;

    super(
      coercer(
        tabs
          ? new Map(params).merge({
            tabsById: new List(tabs).groupBy(t => t.get('id'))
                                    .map(t => t.first())
          }) : params
      )
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
    return cellRefRange.mapCellRefs(xform);
  }
}
