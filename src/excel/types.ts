
export type ExcelSheet = ExcelRow[];

interface ExcelRow {
  [columnLetter: string]: any;
}
