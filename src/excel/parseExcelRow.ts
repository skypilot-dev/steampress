/* eslint-disable no-console */

/* -- Imports -- */
import { JsonObject } from '@skypilot/common-types';
import { isValidDate } from '@skypilot/sugarbowl';

import { transform } from './transform';
import { ExcelRow, ParseRowOptions } from './types';


/* -- Main function -- */
/* Given an object containing the data from a spreadsheet row, transform the data in each desired
 * cell and return an object containing the transformed data. */
export function parseExcelRow(row: ExcelRow, rowOptions: ParseRowOptions): JsonObject {
  const {
    columns,
    disallowEmptyCellsInRow: disallowEmptyCellsInRow = false,
    globalCellTransformers = [],
    rowIndex,
    rowTransformers = [],
    verbose = false,
  } = rowOptions;

  /* The row object contains all columns, but only those named in `columns` are of interest. */
  const desiredColumnLetters: string[] = Object.keys(columns);

  /* Initialize the object that will store the transformed row. */
  const transformedRow: JsonObject = {};

  /* TODO: Refactor exclusion of empty cells */
  let containsDisallowedEmptyCells = false;

  // Copy each desired column value to the corresponding `outputProperty` field on the new object
  desiredColumnLetters.forEach((columnLetter: string) => {

    const {
      disallowEmptyCells: disallowEmptyCellsInColumn = false,
      outputProperty,
      cellTransformers = [],
    } = columns[columnLetter];

    const initialValue = row[columnLetter];
    if (!['number', 'string', 'undefined'].includes(typeof initialValue)) {
      /* The only supported object type is Date */
      if (!isValidDate(initialValue)) {
        throw new Error(`Unrecognized type: ${typeof initialValue}`);
      }
    }

    let finalValue;
    if (typeof initialValue === 'undefined') {
      if (disallowEmptyCellsInRow || disallowEmptyCellsInColumn) {
        /* Cell is empty, so don't add it to the table */
        /* TODO: Add option to allow or disallow exclusions */
        if (verbose) {
          console.log(`WARNING: Row ${rowIndex + 1} contains no value for '${outputProperty}'`);
        }
        containsDisallowedEmptyCells = true;
        return;
      } else {
        finalValue = null;
      }
    } else {
      finalValue = transform(initialValue, [
        ...globalCellTransformers, ...cellTransformers,
      ]);
    }
    transformedRow[outputProperty] = finalValue;
  });

  if (containsDisallowedEmptyCells) {
    if (verbose) {
      console.log(`Row ${rowIndex + 1} has been excluded because it is missing required values`);
    }
    return {};
  } else {
    return transform(transformedRow, rowTransformers);
  }
}
