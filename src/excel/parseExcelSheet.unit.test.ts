import { parseExcelSheet, ParseExcelSheetOptions } from './parseExcelSheet';

const fakeExcelSheetWithHeaderRow = [
  {
    A: 'Key',
    B: 'Value',
    C: 'Notes',
    D: 'Ignored',
  },
  {
    A: 'some-key',
    B: 'some-value',
    C: 'a line of notes',
    D: 'ignored',
  },
];

const structure: ParseExcelSheetOptions = {
  columns: {
    A: {
      expectedHeader: 'Key',
      outputProperty: 'key',
    },
    B: {
      expectedHeader: 'Value',
      outputProperty: 'value',
    },
    C: {
      expectedHeader: 'Notes',
      outputProperty: 'notes',
    },
  },
  hasHeader: true,
};

describe('parseExcel()', () => {

    const expectedObjects = [{
      key: 'some-key',
      value: 'some-value',
      notes: 'a line of notes',
    }];

    it('should transform the sheet into the expected structure', () => {
        const parsedSheet = parseExcelSheet(fakeExcelSheetWithHeaderRow, structure);
        expect(parsedSheet).toEqual(expectedObjects);
    });
});
