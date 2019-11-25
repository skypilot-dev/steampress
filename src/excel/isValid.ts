/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { Literal } from '@skypilot/common-types';
import { isInteger, isValidDate } from '@skypilot/sugarbowl';

import { CellDataType, Validator } from './types';


/* -- Typings -- */
type SupertypeMap = { [key in CellDataType]: CellDataType[] };

export interface IsValidOptions {
  allowUndefined?: boolean;
  dataType?: CellDataType;
  permittedValues?: any[];
  validators?: Validator[];
}


/* Constants */
export const LITERAL_CELL_DATA_TYPES: Partial<CellDataType>[] = ['boolean', 'number', 'string'];

export const CELL_DATA_TYPES: CellDataType[] = [...LITERAL_CELL_DATA_TYPES, 'date', 'integer'];

/* Use this map to indicate that one data type is a valid subset of another data type. */
export const CELL_DATA_TYPE_SUPERTYPES: Partial<SupertypeMap> = {
  integer: ['number'],
};


/* -- Helper functions -- */
function isDefined(value: Literal | undefined): boolean {
  return typeof value !== 'undefined';
}

function makePermittedValuesValidator(permittedValues: any[], dataType: CellDataType | 'any'): Validator {
  if (dataType === 'date') {
    return (dateToMatch: Date): boolean =>
      permittedValues.find((date: Date) => date.getTime() === dateToMatch.getTime())
  }
  return (value: any): boolean => permittedValues.includes(value);
}

/* Given a data type, return a function that checks whether a value is valid for that data type. */
function makeTypeValidator(dataType: CellDataType | 'any' = 'any'): Validator {
  if (dataType === 'any') {
    /* Regardless of whether a data type is specified, these are the only supported types:
     * boolean, number, string, and Date. */
    return (value: any): boolean =>
      [...LITERAL_CELL_DATA_TYPES, 'undefined'].includes(typeof value)
      || isInteger(value)
      || isValidDate(value);
  }
  if (dataType === 'date') {
    return (value: any): boolean => isValidDate(value);
  }

  if (dataType === 'integer') {
    return (value: any): boolean => isInteger(value);
  }

  return (value: any): boolean => typeof value === dataType;
}


/* -- Main function -- */
/* Given a value, return true if all validate functions return true */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValid(value: any, options: IsValidOptions): boolean {
  const {
    allowUndefined = false,
    dataType = 'any',
    permittedValues,
    validators = [],
  } = options;

  /* The validators below are added in this order to avoid meaningless checks:
   * 1. Check whether the cell is empty
   * 2. Check whether the cell's content is of the correct data type
   * 3. Check wether the cell's value is among the permitted values
   * Then do other validations. */
  if (permittedValues) {
    validators.unshift(makePermittedValuesValidator(permittedValues, dataType));
  }

  if (value !== null) {
    validators.unshift(makeTypeValidator(dataType));
  }

  if (!allowUndefined) {
    validators.unshift(isDefined);
  }

  for (let i = 0; i < validators.length; i += 1) {
    const validateFn = validators[i];
    if (!validateFn(value)) {
      return false;
    }
  }
  return true;
}
