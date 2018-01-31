import { Record } from 'immutable';
import CellStyle from './cell-style'
import RemoteRef from './remote-ref';

const CellRecord = Record({
  staticValue: null,
  formula: null,
  isUserEditable: false,
  remoteValue: new RemoteRef(),
  style: new CellStyle(),
  link: null
}, 'Cell');

export default class Cell extends CellRecord { }
