import { parseExcelSheet } from '../parseExcelSheet';
import { ExcelSheet, ParseSheetOptions } from '../types';


describe('parseExcelSheet(:excelSheet, :options)', () => {
  const excelSheet: ExcelSheet = [{
    A: 1, B: 'string', C: undefined,
  }];

  it('should parse only the requested columns', () => {
    const sheetOptions: ParseSheetOptions = {
      columns: { A: {}, B: {} },
    };
    const parsedSheet = parseExcelSheet(excelSheet, sheetOptions);
    expect(parsedSheet).toEqual([
      { A: 1, B: 'string' },
    ]);
  });

  it('when outputProperty is set, should use that value as the key in the output', () => {
    const sheetOptions: ParseSheetOptions = {
      columns: {
        A: { outputProperty: 'colA' },
        B: { outputProperty: 'colB' },
      },
    };
    const parsedSheet = parseExcelSheet(excelSheet, sheetOptions);
    expect(parsedSheet).toEqual([
      { colA: 1, colB: 'string' },
    ]);
  });

  it('when empty cells are allowed, should give empty cells a null value', () => {
    const sheetOptions: ParseSheetOptions = {
      columns: { A: {}, B: {}, C: {} },
      disallowEmptyCellsInSheet: false,
    };
    const parsedSheet = parseExcelSheet(excelSheet, sheetOptions);
    expect(parsedSheet).toEqual([
      { A: 1, B: 'string', C: null },
    ]);
  });

  it('when disallowEmptyCellsInSheet=true, should throw an error when a cell is empty', () => {
    const sheetOptions: ParseSheetOptions = {
      columns: { A: {}, B: {}, C: {} },
      disallowEmptyCellsInSheet: true,
    };
    expect(() => {
      parseExcelSheet(excelSheet, sheetOptions);
    }).toThrow();
  });
});

describe('parseExcel()', () => {
  const excelSheetWithHeaderRow: ExcelSheet = [
    { A: 'Key', B: 'Value', C: 'Notes', D: 'Ignored' },
    { A: 'some-key', B: 'some-value', C: 'a line of notes', D: 'ignored' },
  ];

  const options: ParseSheetOptions = {
    columns: {
      A: { expectedHeader: 'Key', outputProperty: 'key' },
      B: { expectedHeader: 'Value', outputProperty: 'value' },
      C: { expectedHeader: 'Notes', outputProperty: 'notes' },
    },
    hasHeader: true,
  };

  it('should transform the sheet into the expected structure', () => {
    const expectedObjects = [
      { key: 'some-key', value: 'some-value', notes: 'a line of notes' },
    ];
    const parsedSheet = parseExcelSheet(excelSheetWithHeaderRow, options);
    expect(parsedSheet).toEqual(expectedObjects);
  });

  it("should apply the sheet's globalCellTransformers, then the column's own transformers", () => {
    function hyphensToSpaces(str: string): string {
      return str.replace('-', ' ');
    }

    function removeFirstWord(str: string): string {
      const words = str.split(' ');
      const phraseWithRemovedFirstWord = words.slice(1).join(' ');
      return phraseWithRemovedFirstWord;
    }

    function uppercase(str: string): string {
      return str.toUpperCase();
    }

    options.globalCellTransformers = [hyphensToSpaces];
    options.columns.A.cellTransformers = [uppercase];
    options.columns.C.cellTransformers = [removeFirstWord];

    const expectedTransformedObjects = [
      {
        key: 'SOME KEY',
        value: 'some value',
        notes: 'line of notes',
      },
    ];

    const parsedSheet = parseExcelSheet(excelSheetWithHeaderRow, options);
    expect(parsedSheet).toEqual(expectedTransformedObjects);
  });
});
