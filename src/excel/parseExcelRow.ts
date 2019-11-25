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
    disallowEmptyCellsInRow = false,
    globalCellTransformers = [],
    rowIndex = 0,
    rowTransformers = [],
  } = rowOptions;

  /* The row object contains all columns, but only those named in `columns` are of interest. */
  const desiredColumnLetters: string[] = Object.keys(columns);

  /* Initialize the object that will store the transformed row. */
  const transformedRow: JsonObject = {};

  let skipRow = false;

  // Copy each desired column value to the corresponding `outputProperty` field on the new object
  desiredColumnLetters.forEach((columnLetter: string) => {
    if (skipRow) {
      return;
    }
    const {
      cellTransformers = [],
      cellValidators = [],
      dataType,
      defaultValue,
      disallowEmptyCellsInColumn = disallowEmptyCellsInRow,
      ignoreRowIfFalsy = false,
      ignoreRowIfTruthy = false,
      outputProperty = columnLetter,
      permittedValues,
    } = columns[columnLetter];

    const actualValue: Literal | undefined = row[columnLetter];
    let initialValue: Literal | null;

    if (cellIsEmpty(actualValue)) {
      if (defaultValue !== undefined) {
        /* The cell is empty and a default has been provided, so use the default and return. */
        transformedRow[outputProperty] = defaultValue;
        return;
      }

      if (disallowEmptyCellsInColumn) {
        /* TODO: Log an exception instead of throwing an error. */
        throw new Error(`ERROR: Row ${rowIndex + 1} contains no value for '${outputProperty}', but the cell cannot be empty and no default value has been set`);
      } else {
        /* Use a value of `null` for empty cells. */
        initialValue = null;
      }
    } else {
      initialValue = actualValue as Literal | null;
    }
    let transformedValue: Literal | null = initialValue;

    if ((ignoreRowIfTruthy && !!transformedValue) || (ignoreRowIfFalsy && !transformedValue)) {
      skipRow = true;
      return;
    }

    const isValidOptions = {
      validators: cellValidators,
      dataType,
      permittedValues,
    };
    if (!isValid(transformedValue, isValidOptions)) {
      throw new Error(`ERROR: Row ${rowIndex + 1} contains an invalid value for '${outputProperty}': ${initialValue}`);
    }

    transformedValue = transform(transformedValue, [
      ...globalCellTransformers, ...cellTransformers,
    ]);
    transformedRow[outputProperty] = transformedValue;
  });

  if (skipRow) {
    return null;
  }
  return transform(transformedRow, rowTransformers);
}
