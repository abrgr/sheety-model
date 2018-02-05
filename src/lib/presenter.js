import { Record, Map, List } from 'immutable';
import coerce from './coerce';

const PresenterRecord = Record({
  // string id of the presenter
  id: null,
  // Map from string keys to formulas intended to be evaluated against spreadsheet data
  mapDataQuery: new Map(),
  // Array data query
  arrayDataQuery: new List(),
  // Arbitrary key/value pairs provided to the presenter
  config: new Map()
}, 'Presenter');

const coercer = coerce.bind(null, new Map({
  id: (id) => !!id ? ('' + id) : null,
  mapDataQuery: mapDataQuery => !!mapDataQuery ? new Map(mapDataQuery) : null,
  arrayDataQuery: arrayDataQuery => !!arrayDataQuery ? new List(arrayDataQuery) : null,
  config: config => !!config ? new Map(config) : null
}));

export default class Presenter extends PresenterRecord {
  constructor(params) {
    super(coercer(params));
  }
}
