import { Literal } from '@skypilot/common-types';

import { Validator } from './types';


/* -- Typings -- */
interface IsValidOptions {
  allowUndefined?: boolean;
  validators?: Validator[];
}


function isDefined(value: Literal | undefined): boolean {
  return typeof value !== 'undefined';
}


/* -- Main function -- */
/* Given a value, return true if all validate functions return true */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValid(value: any, options: IsValidOptions): boolean {
  const {
    allowUndefined = true,
    validators = [],
  } = options;

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
