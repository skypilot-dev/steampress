import { excelSheetToJson } from './excelSheetToJson';
import { parseExcelSheet, ParseExcelSheetOptions } from './parseExcelSheet';
import { writeToFile } from '../filesystem/writeToFile';


export interface ConvertExcelSheetToJsonOptions {
  noEmit?: boolean;
  source: string;
  sheetName: string;
  url?: string;
  outDir?: string;
  outFile?: string;
  parserOptions: ParseExcelSheetOptions;
}

export function convertExcelSheetToJson(options: ConvertExcelSheetToJsonOptions) {
  const {
    noEmit = false,
    source,
    sheetName,
    outDir = './output',
    outFile = '',
    parserOptions,
  } = options;

  const baseName = outFile || sheetName;

  const excelAsJson = excelSheetToJson({ source, sheetName });
  const parsedExcel = parseExcelSheet(excelAsJson, parserOptions);

  if (!noEmit) {
    if (!outDir) {
      throw new Error('An output directory must be specified with `outDir` unless `noEmit` is true.');
    }
    writeToFile(parsedExcel, {
      baseName,
      format: 'json',
      outDir,
    })
  }
  return parsedExcel;
}
