import { Map, Record } from 'immutable';
import RemoteRef from './remote-ref';
import CellFormat from './cell-format';
import coerce from './coerce';

const CellRecord = Record({
  staticValue: null,
  formula: null,
  isUserEditable: false,
  remoteValue: null,
  link: null,
  format: new CellFormat()
}, 'Cell');

const coercer = coerce.bind(null, new Map({
  staticValue: (staticValue) => staticValue,
  formula: (formula) => !!formula ? ('' + formula) : null,
  isUserEditable: isUserEditable => !!isUserEditable,
  remoteValue: remoteValue => !!remoteValue ? new RemoteRef(remoteValue) : null,
  link: link => !!link ? ('' + link) : null,
  format: format => new CellFormat(format)
}));

export default class Cell extends CellRecord {
  constructor(params) {
    super(coercer(params));
  }
}
