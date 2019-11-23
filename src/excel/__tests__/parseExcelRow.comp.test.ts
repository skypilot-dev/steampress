import { parseExcelRow } from '../parseExcelRow';
import { ExcelRow, ParseRowOptions } from '../types';

describe('parseExcelRow()', () => {
  describe('when `ignoreRowIfFalsy=true` for a column', () => {
    const rowOptions: ParseRowOptions = {
      columns: {
        A: { ignoreRowIfFalsy: true },
        B: {},
      },
    };

    it('if a cell in that column has falsy content, should skip the row', () => {
      const excelRow: ExcelRow = {
        A: undefined,
        B: 2,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual(null);
    });

    it('if a cell in that column does not have falsy content, should not skip the row', () => {
      const excelRow: ExcelRow = {
        A: 1,
        B: 2,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual({ A: 1, B: 2 });
    });
  });

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
    it('if `defaultValue` is set, the cell should get the default value without transformations', () => {
      const toUpperCase = (str: string): string => str.toUpperCase();
      const rowOptions: ParseRowOptions = {
        columns: {
          A: { cellTransformers: [toUpperCase], defaultValue: 'transforms are not applied' },
          B: { cellTransformers: [toUpperCase] },
        },
      };
      const excelRow: ExcelRow = {
        A: undefined,
        B: 'transforms are applied',
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      /* Note that the `cellTransformers` are skipped. */
      expect(jsonRow).toEqual({ A: 'transforms are not applied', B: 'TRANSFORMS ARE APPLIED' });
    });

    it('if `defaultValue` is not set and empty cells are disallowed an error should be thrown', () => {
      const rowOptions: ParseRowOptions = {
        columns: {
          a: { outputProperty: 'colA', disallowEmptyCellsInColumn: true },
        },
      };
      const excelRow: ExcelRow = {
        a: undefined,
      };
      expect(() => {
        parseExcelRow(excelRow, rowOptions);
      }).toThrow();
    });

    it('if `defaultValue` is not set and empty cells are allowed, the cell should get the value `null`', () => {
      const rowOptions: ParseRowOptions = {
        columns: {
          a: { outputProperty: 'colA', disallowEmptyCellsInColumn: false },
        },
      };
      const excelRow: ExcelRow = {
        a: undefined,
      };
      const jsonRow = parseExcelRow(excelRow, rowOptions);
      expect(jsonRow).toEqual({ colA: null });
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
