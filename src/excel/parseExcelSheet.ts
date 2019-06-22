/* TODO: Correctly handle date values from Excel sheets */


import { isValidDate } from '@skypilot/sugarbowl';

import { ExcelRow, ExcelSheet, Transformer, Validator } from './types';


interface Column {
  expectedHeader?: string;
  outputProperty: string;
  transformers?: Transformer[];
  validators?: Validator[];
}

export interface ParseExcelSheetOptions {
  columns: {
    [columnLetter: string]:  Column;
  };
  hasHeader?: boolean;
}


/* -- Helper functions -- */
/* Confirm that headers contain the expected values. */
export function confirmHeaders(row: ExcelRow, sheetStructure: ParseExcelSheetOptions): boolean {
  for (const [letter, value] of Object.entries(row)) {
    const columnStructure = sheetStructure.columns[letter];
    if (columnStructure && columnStructure.expectedHeader) {
      const expectedHeader = columnStructure.expectedHeader;
      const actualHeader = value;
      if (expectedHeader !== actualHeader) {
        console.log(`Expected header '${expectedHeader}', found header '${actualHeader}'`);
        return false;
      }
    }
  }
  return true;
}
/* -- End of helper functions -- */

/* Given the JSON representation of an Excel spreadsheet, transform the data into an array
 * of objects representing the rows of the spreadsheet, selecting only the columns specified in the
 * options. Optionally, also apply additional transformations. */
export function parseExcelSheet(rows: ExcelSheet, sheetStructure: ParseExcelSheetOptions) {

  const {
    hasHeader = false,
  } = sheetStructure;

  let startingRowIndex;
  if (hasHeader) {
    startingRowIndex = 1;
    // It is assumed that headers, if any, are in the first row only
    if (!confirmHeaders(rows[0], sheetStructure)) {
      throw new Error(`Headers do not contain the expected values`);
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
    const rowAsObj = {};

    // Copy each desired column value to the corresponding `outputProperty` field on the new object
    desiredColumnLetters.forEach((columnLetter) => {
      const { outputProperty } = sheetStructure.columns[columnLetter];

      const value = row[columnLetter];
      if (!['number', 'string', 'undefined'].includes(typeof value)) {
        /* The only supported object type is Date */
        if (!isValidDate(value)) {
          throw new Error(`Unrecognized type: ${typeof value}`);
        }
      }

      rowAsObj[outputProperty] = row[columnLetter];
    });

    table.push(rowAsObj);
  }

  return table;
}
