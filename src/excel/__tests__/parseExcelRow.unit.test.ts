import { parseExcelRow } from '../parseExcelRow';
import { ExcelRow, ParseRowOptions } from '../types';

describe('parseExcelRow()', () => {
  describe('when `ignoreRowIfTruthy=true` for a column', () => {
    const rowOptions: ParseRowOptions = {
      columns: {
        a: { ignoreRowIfTruthy: true, outputProperty: 'colA' },
        b: { outputProperty: 'colB' },
      },
    };

    it('if a cell in that column has content, should skip the row', () => {
      const excelRow: ExcelRow = {
        a: 1,
        b: 2,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual(null);
    });

    it('if a cell in that column is empty, should omit the column but not skip the row', () => {
      const excelRow: ExcelRow = {
        a: undefined,
        b: 2,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual({ colB: 2 });
    });

    it('if a cell in that column is empty or falsy, should omit the column not skip the row', () => {
      const falsyValues = [0, ''];
      falsyValues.forEach((falsyValue) => {
        const excelRow: ExcelRow = { a: falsyValue, b: 2 };
        const jsonRow = parseExcelRow(excelRow, rowOptions);
        expect(jsonRow).toEqual({ colB: 2 });
      });
    });
  });

  describe('when a cell is empty', () => {
    it('if `defaultValue` is set, the cell should get the default value', () => {
      const rowOptions: ParseRowOptions = {
        columns: {
          a: { outputProperty: 'colA', defaultValue: 'default' },
        },
      };
      const excelRow: ExcelRow = {
        a: undefined,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual({ colA: 'default' });
    });

    it('if `defaultValue` is not set, an error should be thrown', () => {
      const rowOptions: ParseRowOptions = {
        columns: {
          a: { outputProperty: 'colA' },
        },
      };
      const excelRow: ExcelRow = {
        a: undefined,
      };
      expect(() => {
        parseExcelRow(excelRow, rowOptions);
      }).toThrow();
    });

    it('if the empty cell is in a `ignoreRowIfTruthy` column, the row should be not be rejected', () => {
      const rowOptions: ParseRowOptions = {
        columns: {
          a: { ignoreRowIfTruthy: true, outputProperty: 'colA' },
        },
      };
      const excelRow: ExcelRow = {
        a: undefined,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual({});
    });
  });
});
