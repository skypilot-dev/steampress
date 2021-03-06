import { excelSheetToJson } from '../excelSheetToJson';
import { ExcelRow, ExcelSheet } from '../types';

const fakeFileName = 'tests/fakes/excel-converter-fake.xlsx';
const fakeSheetName = 'Sheet1';

describe('excelSheetToJson', () => {

  let sheetAsJson: ExcelSheet;
  let row1: ExcelRow;
  it('should get a sheet from the loader', () => {
    sheetAsJson = excelSheetToJson({ source: fakeFileName, sheetName: fakeSheetName });
    expect(typeof sheetAsJson).toBe('object');
  });

  it('sheet should comprise an array of objects representing non-empty rows', () => {
    expect(Array.isArray(sheetAsJson)).toBe(true);
  });

  it('each non-empty row should contain an array of objects representing cells', () => {
    expect(Array.isArray(sheetAsJson)).toBe(true);
    row1 = sheetAsJson[0];
    expect(row1).toHaveProperty('A');
  });

  it('the first row should contain column headers', () => {
    expect(row1.A).toBe('Col-A-string');
    expect(row1.B).toBe('Col-B-number');
  });
});
