/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { Literal } from '@skypilot/common-types';
import { isValidDate } from '@skypilot/sugarbowl';

import { CellDataType, Validator } from './types';


/* -- Typings -- */
export interface IsValidOptions {
  allowUndefined?: boolean;
  dataType?: CellDataType;
  validators?: Validator[];
}


/* -- Helper functions -- */
function isDefined(value: Literal | undefined): boolean {
  return typeof value !== 'undefined';
}

/* Given a data type, return a function that checks whether a value is valid for that data type. */
function makeTypeValidator(dataType: CellDataType | 'any' = 'any'): Validator {
  if (dataType === 'any') {
    /* Regardless of whether a data type is specified, these are the only supported types:
     * boolean, number, string, and Date. */
    return (value: any): boolean =>
      ['boolean', 'number', 'string', 'undefined'].includes(typeof value)
      || isValidDate(value);
  }
  if (dataType === 'date') {
    return (value: any): boolean => isValidDate(value);
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
    validators = [],
  } = options;

  validators.unshift(makeTypeValidator(dataType));

  /* If undefined values are not permitted, do the check for undefined first (to avoid other checks
   * that would not be applicable to an undefined value). */
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
