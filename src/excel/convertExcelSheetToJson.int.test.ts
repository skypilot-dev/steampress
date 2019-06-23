import { convertExcelSheetToJson, ConvertExcelSheetToJsonOptions } from './convertExcelSheetToJson';
import { excelSheetToJson } from './excelSheetToJson';
import { confirmHeaders } from './parseExcelSheet';
import { isValidDate } from '@skypilot/sugarbowl';

const converterOptions: ConvertExcelSheetToJsonOptions = {
  source: 'tests/fakes/excel-converter-fake.xlsx',
  sheetName: 'Sheet1',
  outDir: 'tmp/tests-output',
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

describe('convertExcelSheetToJson', () => {

  let sheetAsJson;
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
    let parsedSheet;
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
      const stringProps = parsedSheet.map((row) => row.stringProp);
      expect(stringProps).toEqual(['A2', 'A3', 'A4', 'A6']);
    });


    it('should transform numeric values to numbers', () => {
      const numberProps = parsedSheet.map((row) => row.numberProp);
      expect(numberProps).toEqual([-2, 3, 4.5, 6]);
    });


    it('should transform formulas to values', () => {
      const formulaProps = parsedSheet.map((row) => row.formulaProp);

      /* We'll check the date value separately */
      expect(formulaProps.slice(1)).toEqual([5, 5.5, 'Concatenation']);

      const dateValue = formulaProps[0];
      expect(isValidDate(dateValue)).toBe(true);
      expect(dateValue.getFullYear()).toBe(1989);
      expect(dateValue.getMonth() + 1).toBe(1);
      expect(dateValue.getDate() + 1).toBe(28);
    });
  });
});
