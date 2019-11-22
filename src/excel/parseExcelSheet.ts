/* -- Imports -- */
import { isValidDate } from '@skypilot/sugarbowl';

import { removeExtraWhitespace } from '../transformers';

import { transform } from './transform';
import { ExcelRow, ExcelSheet, Transformer, Validator } from './types';


/* -- Typings -- */
interface ParseColumnOptions {
  cellTransformers?: Transformer[];
  /* TODO: If the need arises, add a `columnTransformers` property. */
  expectedHeader?: string;
  disallowEmptyCells?: boolean;
  outputProperty: string;
  validators?: Validator[];
}

export interface ParseExcelSheetOptions {
  columns: {
    [columnLetter: string]:  ParseColumnOptions;
  };
  disallowEmptyCells?: boolean;
  hasHeader?: boolean;
  /* TODO: Possibly add `cellPosttransformers` */
  globalCellTransformers?: Transformer[];
  rowTransformers?: Transformer[];
  /* TODO: Possibly rename to indicate that these transformers apply to the entire sheet */
  transformers?: ObjectArrayTransformer[];
  verbose?: boolean;
}

type ObjectArrayTransformer = (value: object[]) => object[];


/* -- Helper functions -- */
// Confirm that headers contain the expected values.
export function confirmHeaders(row: ExcelRow, sheetStructure: ParseExcelSheetOptions): boolean {
  const entries = Object.entries(row);
  for (let i = 0; i < entries.length; i += 1) {
    const [letter, value] = entries[i];
    const columnStructure = sheetStructure.columns[letter];

    if (columnStructure && columnStructure.expectedHeader) {
      const expectedHeader = columnStructure.expectedHeader;
      const actualHeader = removeExtraWhitespace(value);
      if (expectedHeader !== actualHeader) {
        console.log(`Expected header '${expectedHeader}', found header '${actualHeader}'`);
        return false;
      }
    }
  }
  return true;
}

/* -- Main function -- */
export function parseExcelSheet(rows: ExcelSheet, sheetStructure: ParseExcelSheetOptions): object[] {
  const {
    disallowEmptyCells: disallowEmptyCellsInRow = false,
    hasHeader = false,
    globalCellTransformers = [],
    rowTransformers = [],
    transformers = [],
    verbose = false,
  } = sheetStructure;

  let startingRowIndex;
  if (hasHeader) {
    startingRowIndex = 1;
    // It is assumed that headers, if any, are in the first row only
    if (!confirmHeaders(rows[0], sheetStructure)) {
      throw new Error('Headers do not contain the expected values');
    }
  } else {
    startingRowIndex = 0;
  }

  // Each row is an object having the property names defined in `Column`
  const table = [];

  const desiredColumnLetters = Object.keys(sheetStructure.columns);
  for (let i = startingRowIndex; i < rows.length; i += 1) {

    const row = rows[i];

    // Initialize the object
    const rowAsObj: { [key: string]: any } = {};


    /* TODO: Refactor exclusion of empty cells */
    let containsDisallowedEmptyCells = false;

    // Copy each desired column value to the corresponding `outputProperty` field on the new object
    desiredColumnLetters.forEach((columnLetter) => {

      const {
        disallowEmptyCells: disallowEmptyCellsInColumn = false,
        outputProperty,
        cellTransformers = [],
      } = sheetStructure.columns[columnLetter];

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
            console.log(`WARNING: Row ${i} contains no value for '${outputProperty}'`);
          }
          containsDisallowedEmptyCells = true;
          return;
        } else {
          finalValue = null;
        }
      } else {
        finalValue = transform(initialValue, [
          ...globalCellTransformers,
          ...cellTransformers,
        ]);
      }
      rowAsObj[outputProperty] = finalValue;
    });

    if (containsDisallowedEmptyCells) {
      if (verbose) {
        console.log(`Row ${i} has been excluded because it is missing required values`);
      }
    } else {
      const finalRowObj = transform(rowAsObj, rowTransformers);
      table.push(finalRowObj);
    }
  }

  let transformedTable = table;
  transformers.forEach((transformFn) => {
    transformedTable = transformFn(transformedTable);
  });
  return transformedTable;
}
