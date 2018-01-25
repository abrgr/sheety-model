import assert from 'assert';
import { List, Range, is } from 'immutable';
import { Tab, CellRef } from '../..';

describe('CellRef', () => {
  describe('fromTabAndA1Ref', () => {
    it('should work for valid values', () => {
      const tab = new Tab({ id: 'hi' });
      assert.ok(
        is(
          CellRef.fromTabAndA1Ref(tab, 'A1'),
          new CellRef({ tabId: 'hi', rowIdx: 0, colIdx: 0 })
        )
      );
      assert.ok(
        is(
          CellRef.fromTabAndA1Ref(tab, '$D45'),
          new CellRef({ tabId: 'hi', rowIdx: 44, colIdx: 3 })
        )
      );
      assert.ok(
        is(
          CellRef.fromTabAndA1Ref(tab, 'AB$98'),
          new CellRef({ tabId: 'hi', rowIdx: 97, colIdx: 27 })
        )
      );
      assert.ok(
        is(
          CellRef.fromTabAndA1Ref(tab, '$CV$100'),
          new CellRef({ tabId: 'hi', rowIdx: 99, colIdx: 99 })
        )
      );
    });
  });
});
