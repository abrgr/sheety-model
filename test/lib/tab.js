import assert from 'assert';
import { List, Range, is } from 'immutable';
import { Tab, Cell } from '../..';

describe('Tab', () => {
  describe('getCellByRef', () => {
    it('should work for valid values', () => {
      const tab = tabFactory(100, 100);
      assert.ok(is(tab.getCellByRef('A1'), new Cell({ formula: '0 * 0' })));
      assert.ok(is(tab.getCellByRef('$D45'), new Cell({ formula: '44 * 3' })));
      assert.ok(is(tab.getCellByRef('AB$98'), new Cell({ formula: '97 * 27' })));
      assert.ok(is(tab.getCellByRef('$CV$100'), new Cell({ formula: '99 * 99' })));
    });
  });
});

function tabFactory(rows, cols) {
  return new Tab({
    rows: Range(0, rows).map((r) => (
      Range(0, cols).map((c) => (
        new Cell({
          formula: `${r} * ${c}`
        })
      ))
    ))
  });
}
