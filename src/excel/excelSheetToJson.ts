import excelToJson from 'convert-excel-to-json';
import {readFileSync } from 'fs';

import { ExcelSheet } from './types';


interface ExcelSheetToJsonOptions {
  source: string;
  sheetName: string;
}


/* Read one sheet from the specified Excel file and return it as a JSON object */
export function excelSheetToJson({ source, sheetName }: ExcelSheetToJsonOptions): ExcelSheet {

  const file = readFileSync(source);

  const fileAsJson = excelToJson({ source: file });

  if (!Object.keys(fileAsJson).includes(sheetName)) {
    throw new Error(`The file does not contain a sheet named '${sheetName}'.`)
  }

  const sheetAsJson = fileAsJson[sheetName];

  return sheetAsJson;
}
