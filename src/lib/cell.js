import { Record, Iterable } from 'immutable';
import RemoteRef from './remote-ref';

const CellRecord = Record({
  staticValue: null,
  formula: null,
  isUserEditable: false,
  remoteValue: new RemoteRef(),
  link: null
}, 'Cell');

export default class Cell extends CellRecord {
  constructor(params) {
    const [staticValue, formula, isUserEditable, remoteValue, link]
      = Iterable.isIterable(params)
      ? [params.get('staticValue'), params.get('formula'), params.get('isUserEditable'), params.get('remoteValue'), params.get('link')]
      : [params.staticValue, params.formula, params.isUserEditable, params.remoteValue, params.link];
    super({
      staticValue: staticValue,
      formula: !!formula ? ('' + formula) : null,
      isUserEditable: !!isUserEditable,
      remoteValue: !!remoteValue ? new RemoteRef(remoteValue) : null,
      link: !!link ? ('' + link) : null
    });
  }
}
