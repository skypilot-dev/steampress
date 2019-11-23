/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

/* -- Imports -- */
import { JsonObject, Literal } from '@skypilot/common-types';

import { isValid } from './isValid';
import { transform } from './transform';
import { ExcelRow, ParseRowOptions } from './types';


/* -- Helper functions -- */
function cellIsEmpty(value: any): boolean {
  /* The Excel converter gives empty cells a value of `undefined`. */
  return value === undefined;
}


/* -- Main function -- */
/* Given an object containing the data from a spreadsheet row, transform the data in each desired
 * cell and return a) an object containing the transformed data or b) null if the row cannot
 * be parsed. */
export function parseExcelRow(row: ExcelRow, rowOptions: ParseRowOptions): JsonObject | null {
  const {
    columns,
    globalCellTransformers = [],
    rowIndex = 0,
    rowTransformers = [],
  } = rowOptions;

  /* The row object contains all columns, but only those named in `columns` are of interest. */
  const desiredColumnLetters: string[] = Object.keys(columns);

  /* Initialize the object that will store the transformed row. */
  const transformedRow: JsonObject = {};

  // Copy each desired column value to the corresponding `outputProperty` field on the new object
  for (let i = 0; i < desiredColumnLetters.length; i += 1) {
    const columnLetter: string = desiredColumnLetters[i];
    const {
      defaultValue,
      ignoreRowIfTruthy = false,
      outputProperty,
      cellTransformers = [],
    } = columns[columnLetter];

    const initialValue: Literal = row[columnLetter];
    let transformedValue = initialValue;

    if (ignoreRowIfTruthy) {
      if (initialValue) {
        return null;
      }
    } else {
      /* Note that an empty value is OK if `ignoreRowIfTruthy`, because the value is discarded. */
      if (cellIsEmpty(initialValue)) {
        if (defaultValue === undefined) {
          /* TODO: Log an exception instead of throwing an error. */
          throw new Error(`ERROR: Row ${rowIndex + 1} contains no value for '${outputProperty}' and no default value has been set`);
        } else {
          transformedValue = defaultValue;
        }
      } else {
        if (!isValid(initialValue, {})) {
          throw new Error(`ERROR: Row ${rowIndex + 1} contains an invalid value for '${outputProperty}': ${initialValue}`);
        }
      }
    }

    transformedValue = transform(transformedValue, [
      ...globalCellTransformers, ...cellTransformers,
    ]);
    if (!ignoreRowIfTruthy) {
      transformedRow[outputProperty] = transformedValue;
    }
  }
  return transform(transformedRow, rowTransformers);
}
