/* -- Imports -- */
import { readFileSync } from 'fs';

import excelToJson from 'convert-excel-to-json';

import { ExcelSheet } from './types';


/* -- Typings -- */
interface ExcelSheetToJsonOptions {
  source: string;
  sheetName: string;
}


/* -- Main function -- */
/* Read one sheet from the specified Excel file and return it as a JSON object */
export function excelSheetToJson({ source, sheetName }: ExcelSheetToJsonOptions): ExcelSheet {

  const file = readFileSync(source);

  const fileAsJson = excelToJson({ source: file });

  if (!Object.keys(fileAsJson).includes(sheetName)) {
    throw new Error(`The file does not contain a sheet named '${sheetName}'.`);
  }

  const sheetAsJson = fileAsJson[sheetName];

  return sheetAsJson;
}
