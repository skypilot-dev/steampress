/* eslint-disable no-console */

/* -- Imports -- */
import { JsonObject } from '@skypilot/common-types';
import { isValidDate } from '@skypilot/sugarbowl';

import { transform } from './transform';
import { ExcelRow, ParseRowOptions } from './types';


/* -- Main function -- */
/* Given an object containing the data from a spreadsheet row, transform the data in each desired
 * cell and return a) an object containing the transformed data or b) null if the row cannot
 * be parsed. */
export function parseExcelRow(row: ExcelRow, rowOptions: ParseRowOptions): JsonObject | null {
  const {
    columns,
    disallowEmptyCellsInRow,
    globalCellTransformers = [],
    rowIndex,
    rowTransformers = [],
    verbose = false,
  } = rowOptions;

  /* The row object contains all columns, but only those named in `columns` are of interest. */
  const desiredColumnLetters: string[] = Object.keys(columns);

  /* Initialize the object that will store the transformed row. */
  const transformedRow: JsonObject = {};

  // Copy each desired column value to the corresponding `outputProperty` field on the new object
  for (let i = 0; i < desiredColumnLetters.length; i += 1) {
    const columnLetter: string = desiredColumnLetters[i];
    const {
      disallowEmptyCellsInColumn = disallowEmptyCellsInRow,
      ignoreRowIfTruthy = false,
      outputProperty,
      cellTransformers = [],
    } = columns[columnLetter];

    const initialValue = row[columnLetter];

    if (ignoreRowIfTruthy && !!initialValue) {
      return null;
    }

    if (!['number', 'string', 'undefined'].includes(typeof initialValue)) {
      /* The only supported object type is Date */
      if (!isValidDate(initialValue)) {
        throw new Error(`Unrecognized type: ${typeof initialValue}`);
      }
    }

    let finalValue;
    if (typeof initialValue === 'undefined') {
      if (disallowEmptyCellsInColumn) {
        /* TODO: Add option to allow or disallow exclusions */
        if (verbose) {
          console.log(`WARNING: Row ${rowIndex + 1} has been excluded because it contains no value for '${outputProperty}'`);
        }
        return null;
      } else {
        finalValue = null;
      }
    } else {
      finalValue = transform(initialValue, [
        ...globalCellTransformers, ...cellTransformers,
      ]);
    }
    if (!ignoreRowIfTruthy) {
      transformedRow[outputProperty] = finalValue;
    }
  }
  return transform(transformedRow, rowTransformers);
}
