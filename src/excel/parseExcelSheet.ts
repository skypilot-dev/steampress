/* -- Imports -- */
import { JsonMap } from '@skypilot/common-types';

import { removeExtraWhitespace } from '../transformers';

import { parseExcelRow } from './parseExcelRow';
import { ExcelRow, ExcelSheet, ParseSheetOptions  } from './types';


/* -- Helper functions -- */
// Confirm that headers contain the expected values.
export function confirmHeaders(row: ExcelRow, sheetOptions: ParseSheetOptions): boolean {
  const entries = Object.entries(row);
  for (let i = 0; i < entries.length; i += 1) {
    const [letter, value] = entries[i];
    const columnStructure = sheetOptions.columns[letter];

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
export function parseExcelSheet(rows: ExcelSheet, sheetStructure: ParseSheetOptions): JsonMap[] {
  const {
    columns,
    disallowEmptyCellsInSheet = false,
    globalCellTransformers = [],
    hasHeader = false,
    rowTransformers = [],
    sheetTransformers = [],
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
  const table: JsonMap[] = [];

  for (let i = startingRowIndex; i < rows.length; i += 1) {

    const row = rows[i];

    const rowAsObj: JsonMap | null = parseExcelRow(row, {
      columns,
      disallowEmptyCellsInRow: disallowEmptyCellsInSheet,
      globalCellTransformers,
      rowIndex: i,
      rowTransformers,
      verbose,
    });
    if (rowAsObj) {
      table.push(rowAsObj)
    }
  }

  let transformedTable = table;
  sheetTransformers.forEach((transformFn) => {
    transformedTable = transformFn(transformedTable);
  });
  return transformedTable;
}
