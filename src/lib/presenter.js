import { Record, Map, List, Iterable } from 'immutable';

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

export default class Presenter extends PresenterRecord {
  constructor(params) {
    const [id, mapDataQuery, arrayDataQuery, config]
      = Iterable.isIterable(params)
      ? [params.get('id'), params.get('mapDataQuery'), params.get('arrayDataQuery'), params.get('config')]
      : [params.id, params.mapDataQuery, params.arrayDataQuery, params.config];
    super({
      id: !!id ? ('' + id) : null,
      mapDataQuery: !!mapDataQuery ? new Map(mapDataQuery) : null,
      arrayDataQuery: !!arrayDataQuery ? new List(arrayDataQuery) : null,
      config: !!config ? new Map(config) : null
    });
  }
}
