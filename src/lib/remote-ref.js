import { Record } from 'immutable';

const RemoteRefRecord = Record({
  collection: null,
  documentIdTemplate: null,
  jsonPathTemplate: null,
  aggregationMethod: null
}, 'RemoteRef');

export default class RemoteRef extends RemoteRefRecord { }
