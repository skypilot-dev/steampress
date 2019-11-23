import { parseExcelRow } from '../parseExcelRow';
import { ExcelRow, ParseRowOptions } from '../types';

describe('parseExcelRow()', () => {
  describe('when `ignoreRowIfTruthy=true` for a column', () => {
    const rowOptions: ParseRowOptions = {
      columns: {
        a: { ignoreRowIfTruthy: true, outputProperty: 'colA' },
        b: { outputProperty: 'colB' },
      },
      rowIndex: 0,
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
});
