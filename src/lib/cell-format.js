import { Map, Record } from 'immutable';
import ssf from 'ssf';
import moment from 'moment';
import coerce from './coerce';

const types = Object.freeze({
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  PERCENT: 'PERCENT',
  CURRENCY: 'CURRENCY',
  DATE: 'DATE',
  TIME: 'TIME',
  DATE_TIME: 'DATE_TIME',
  SCIENTIFIC: 'SCIENTIFIC'
});

function isNumericType(type) {
  return type !== types.TEXT;
}

const probablyToNum = (val) => {
  if ( typeof val === 'number' ) {
    return val;
  }

  if ( /^(-+)?\d*[.]?\d*$/.exec('' + val) ) {
    return +val;
  }

  // probably mis-categorized as a number
  return val;
};
const toStr = (val) => !!val ? ('' + val) : '';

const toJSValue = Object.freeze({
  TEXT: toStr,
  NUMBER: probablyToNum,
  PERCENT: probablyToNum,
  CURRENCY: probablyToNum,
  DATE: (val) => moment(ssf.format('yyyy-mm-dd', val), 'YYYY-MM-DD'),
  TIME: (val) => moment(ssf.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss'), // TODO: is this right?
  DATE_TIME: (val) => moment(ssf.format('yyyy-mm-dd hh:mm:ss', val), 'YYYY-MM-DD HH:mm:ss'),
  SCIENTIFIC: probablyToNum
});

const toFormatableValue = Object.freeze({
  TEXT: toStr,
  NUMBER: probablyToNum,
  PERCENT: probablyToNum,
  CURRENCY: probablyToNum,
  DATE: probablyToNum,
  TIME: probablyToNum,
  DATE_TIME: probablyToNum,
  SCIENTIFIC: probablyToNum
});

const fromUserEnteredNum = (maybeNum) => {
  if ( typeof maybeNum === 'number' ) {
    return maybeNum;
  }

  const match = /[-]?\d[\d,.]*|[,.][\d,.]+/.exec(maybeNum);
  if ( !match ) {
    return NaN;
  }

  const n = '' + maybeNum;

  // TODO: we should actually figure out what the locale uses for a decimal separator
  // now, try to guess at a locale to deal with decimals
  const lastComma = n.lastIndexOf(',');
  const lastDecimal = n.lastIndexOf('.');

  if ( lastComma > lastDecimal ) {
    // we're either European with a decimal or US without a decimal
    if ( lastDecimal >= 0 ) {
      // if we have both, we are much more likely European with a decimal
      return parseFloat(n.replace('.', '').replace(',', '.'));
    }

    // otherwise, we assume we're US
    return parseInt(n.replace(',', ''), 10);
  } else if ( lastDecimal > lastComma ) {
    // we're either US with a decimal or European without a decimal
    // just assume we're US for now
    return parseFloat(n.replace(',', ''));
  }

  // we have no comma or decimal
  return parseInt(n, 10);
};

const userEnteredValueToSheetValue = Object.freeze({
  TEXT: (val) => '' + val,
  NUMBER: fromUserEnteredNum,
  PERCENT: (val) => fromUserEnteredNum(val) / 100,
  CURRENCY: fromUserEnteredNum,
  DATE: (val) => moment(val).diff(moment('1899-12-30'), 'days'),
  TIME: (val) => moment(val), // TODO: is this right?
  DATE_TIME: (val) => moment(val).diff(moment('1899-12-30')) / 86400000,
  SCIENTIFIC: (val) => {
    if ( typeof val === 'string' && val.indexOf('e') > 0 ) {
      return parseFloat(val);
    }

    return fromUserEnteredNum(val);
  }
});

const CellFormatRecord = Record({
  type: types.TEXT,
  pattern: ''
});

const coercer = coerce.bind(null, new Map({
  type: (type) => !!type && !!types[type] ? type : types.TEXT,
  pattern: (pattern) => !!pattern ? pattern : ''
}));

export default class CellFormat extends CellFormatRecord {
  constructor(params) {
    super(coercer(params));
  }

  format(val) {
    const valueOf = toFormatableValue[this.get('type')];
    const value = !!valueOf ? valueOf(val) : val;

    const matchingTypes = isNumericType(this.get('type'))
                        ? typeof value === 'number'
                        : typeof value === 'string';

    return matchingTypes
         ? ssf.format(this.get('pattern'), value)
         : val;
  }

  toJSValue(val) {
    const valueOf = toJSValue[this.get('type')];
    return valueOf ? valueOf(val) : val;
  }

  fromUserEnteredValue(userEnteredValue) {
    const valueOf = userEnteredValueToSheetValue[this.get('type')];
    return valueOf
         ? valueOf(userEnteredValue)
         : userEnteredValue;
  }
}

CellFormat.Types = types;
