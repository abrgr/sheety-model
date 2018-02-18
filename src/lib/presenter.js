import { fromJS, Record, Map, List } from 'immutable';
import coerce from './coerce';

const PresenterRecord = Record({
  // string id of the presenter
  id: null,
  // type of the presenter
  type: null,
  // Map from string keys to formulas intended to be evaluated against spreadsheet data
  mapDataQuery: new Map(),
  // Array data query
  arrayDataQuery: null,
  // Arbitrary key/value pairs provided to the presenter
  config: new Map()
}, 'Presenter');

const coercer = coerce.bind(null, new Map({
  id: (id) => !!id ? ('' + id) : null,
  type: (type) => !!type ? ('' + type) : null,
  mapDataQuery: mapDataQuery => !!mapDataQuery ? new Map(mapDataQuery) : null,
  arrayDataQuery: arrayDataQuery => !!arrayDataQuery ? ('' + arrayDataQuery) : null,
  config: config => !!config ? fromJS(config) : null
}));

export default class Presenter extends PresenterRecord {
  constructor(params) {
    super(coercer(params));
  }
}
