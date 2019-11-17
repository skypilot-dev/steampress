/* -- Imports -- */
import { formatAsJson } from '../exporters/formatAsJson';
import { formatAsTypeScript, TypeScriptFormatterOptions } from '../exporters/formatAsTypeScript';
import { writeTextToFile } from '../filesystem/writeTextToFile';

import { excelSheetToJson } from './excelSheetToJson';
import { parseExcelSheet, ParseExcelSheetOptions } from './parseExcelSheet';


/* -- Typings -- */
export interface ConvertExcelSheetToJsonOptions {
  noEmit?: boolean;
  source: string;
  sheetName: string;
  url?: string;
  outDir?: string;
  outFile?: string;
  outFormat?: 'json' | 'typescript';
  formatterOptions?: TypeScriptFormatterOptions | {};
  parserOptions: ParseExcelSheetOptions;
}


/* -- Constants -- */
const formats = {
  json: {
    extension: 'json',
    formatter: formatAsJson,
  },
  typescript: {
    extension: 'ts',
    formatter: formatAsTypeScript,
  },
};

/* -- Main function -- */
export function convertExcelSheetToJson(options: ConvertExcelSheetToJsonOptions): object[] {
  const {
    noEmit = false,
    source,
    sheetName,
    outDir = './output',
    outFile = '',
    outFormat = 'json',
    formatterOptions = {},
    parserOptions,
  } = options;

  const excelAsJson = excelSheetToJson({ source, sheetName });
  const parsedExcel = parseExcelSheet(excelAsJson, parserOptions);

  if (!noEmit) {
    if (!outDir) {
      throw new Error('An output directory must be specified with `outDir` unless `noEmit` is true.');
    }

    const { extension, formatter } = formats[outFormat];

    const outputText = formatter(parsedExcel, formatterOptions);
    const fileName = outFile || `${sheetName}.${extension}`;

    writeTextToFile(outputText, {
      dirName: outDir,
      fileName,
    })
  }
  return parsedExcel;
}
