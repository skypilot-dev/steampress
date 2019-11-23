import { parseExcelSheet } from '../parseExcelSheet';
import { ExcelSheet, ParseSheetOptions } from '../types';


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
