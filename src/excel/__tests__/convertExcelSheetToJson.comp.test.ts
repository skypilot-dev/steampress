import { existsSync, mkdirSync } from 'fs';
import os from 'os';
import path from 'path';

import type { JsonMap } from '@skypilot/common-types';
import { isValidDate } from '@skypilot/sugarbowl';

import { name, version } from '../../../package.json';
import { convertExcelSheetToJson, ConvertExcelSheetToJsonOptions } from '../convertExcelSheetToJson';
import { excelSheetToJson } from '../excelSheetToJson';
import { confirmHeaders } from '../parseExcelSheet';
import { ExcelRow, ExcelSheet } from '../types';

/* Designate a temporary directory for files generated by tests. */
const TMP_DIR_PATH = os.tmpdir();
const packageTmpDir = `${name}-v${version}`
  .replace('@', '')
  .replace('/', '-');
const tmpDirPath = path.join(TMP_DIR_PATH, packageTmpDir, 'tests');

const converterOptions: ConvertExcelSheetToJsonOptions = {
  source: 'tests/fakes/excel-converter-fake.xlsx',
  sheetName: 'Sheet1',
  noEmit: true,
  outDir: `${tmpDirPath}/tests-output`,
  formatterOptions: {
    declaredType: 'QuestionCreateInput[]',
  },
  parserOptions: {
    columns: {
      A: {
        expectedHeader: 'Col-A-string',
        outputProperty: 'stringProp',
      },
      B: {
        expectedHeader: 'Col-B-number',
        outputProperty: 'numberProp',
      },
      /* TODO: Add support for dates */
      // C: {
      //   expectedHeader: 'Col-C-date',
      //   outputProperty: 'dateProp',
      // },
      D: {
        expectedHeader: 'Col-D-formula',
        outputProperty: 'formulaProp',
      },
    },
    hasHeader: true,
  },
};

beforeAll(() => {
  if (!existsSync(tmpDirPath)) {
    mkdirSync(tmpDirPath, { recursive: true });
  }
});

describe('convertExcelSheetToJson', () => {

  let sheetAsJson: ExcelSheet;
  describe('excelSheetToJson()', () => {
    it('should load the sheet as an array', () => {
      sheetAsJson = excelSheetToJson(converterOptions);
      expect(Array.isArray(sheetAsJson)).toBe(true);
    });

    it('confirmHeaders() should confirm that headers are as expected', () => {
      const headersAreAsExpected = confirmHeaders(sheetAsJson, converterOptions.parserOptions);
      expect(headersAreAsExpected).toBe(true);
    });
  });


  describe('convertExcelSheetToJson()', () => {
    let parsedSheet: JsonMap[];
    it('should spreadsheet rows into object literals', () => {
      parsedSheet = convertExcelSheetToJson(converterOptions);
      expect(typeof parsedSheet).toBe('object');

      const [firstRow] = parsedSheet;
      expect(typeof firstRow).toBe('object');
      expect(firstRow).toHaveProperty('stringProp');
      expect(firstRow).toHaveProperty('numberProp');
      expect(firstRow).toHaveProperty('formulaProp');
    });


    it('should return only nonempty rows', () => {
      const expectedNumberOfRows = 4;
      expect(parsedSheet.length).toBe(expectedNumberOfRows);
    });


    it('should transform text values to strings', () => {
      const stringProps = parsedSheet.map((row: ExcelRow) => row.stringProp);
      expect(stringProps).toEqual(['A2', 'A3', 'A4', 'A6']);
    });


    it('should transform numeric values to numbers', () => {
      const numberProps = parsedSheet.map((row: ExcelRow) => row.numberProp);
      expect(numberProps).toEqual([-2, 3, 4.5, 6]);
    });


    it('should transform formulas to values', () => {
      const formulaProps = parsedSheet.map((row: ExcelRow) => row.formulaProp);

      /* We'll check the date value separately */
      expect(formulaProps.slice(1)).toEqual([5, 5.5, 'Concatenation']);

      const dateValue = formulaProps[0];
      expect(isValidDate(dateValue)).toBe(true);

      expect(dateValue.getUTCFullYear()).toBe(1989);
      /* Note that `getMonth()` returns a 0-indexed value for the month. */
      expect(dateValue.getUTCMonth() + 1).toBe(1);
      expect(dateValue.getUTCDate()).toBe(28);
    });

    it('should by default save to a JSON file', () => {
      const options = {
        ...converterOptions,
        noEmit: false,
      };
      const expectedFilename = `${options.sheetName}.json`;
      convertExcelSheetToJson(options);
      const fileExists = existsSync(`${options.outDir}/${expectedFilename}`);
      expect(fileExists).toBe(true);
    });


    it('can save to a TypeScript file', () => {
      const options: ConvertExcelSheetToJsonOptions = {
        ...converterOptions,
        outFormat: 'typescript',
        noEmit: false,
        formatterOptions: {
          declaredType: 'SampleInterface[]',
        },
      };

      const expectedFilename = `${options.sheetName}.ts`;
      convertExcelSheetToJson(options);
      const fileExists = existsSync(`${options.outDir}/${expectedFilename}`);
      expect(fileExists).toBe(true);
    });
  });
});
