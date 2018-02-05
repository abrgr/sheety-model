import { Map, Record } from 'immutable';
import coerce from './coerce';

const RemoteRefRecord = Record({
  collection: null,
  documentIdTemplate: null,
  jsonPathTemplate: null,
  aggregationMethod: null
}, 'RemoteRef');

const coercer = coerce.bind(null, new Map({
  collection: (collection) => '' + collection,
  documentIdTemplate: (documentIdTemplate) => '' + documentIdTemplate,
  jsonPathTemplate: (jsonPathTemplate) => '' + jsonPathTemplate,
  aggregationMethod: (aggregationMethod) => '' + aggregationMethod
}));

export default class RemoteRef extends RemoteRefRecord {
  constructor(params) {
    super(coercer(params));
  }
}
