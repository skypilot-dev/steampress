import * as actualExports from '../src';

const intendedExports = [
  /* -- Conversions -- */
  'convertExcelSheetToJson',
  'excelSheetToJson',
  'parseExcelSheet',

  /* -- Transformations */
  'duplicateProperty',

  /* re-exported string functions */
  'capitalizeAllWords',
  'capitalizeFirstWord',
  'digitsOnly',
  'nondigitsOnly',
  'removeExtraWhitespace',
  'removeWhitespace',
  'toLowerCase',
  'toUpperCase',
  'trim',
  'trimLeft',
  'trimRight',
];

describe('Export verification', () => {

  const actualExportNames = Object.keys(actualExports);

  it('exports should include all intended exports', () => {
    for (const exportName of intendedExports) {
      expect(actualExportNames).toContain(exportName);
    }
  });


  it('exports should not include any unintended exports', () => {
    for (const exportName of actualExportNames) {
      expect(intendedExports).toContain(exportName);
    }
  });
});
