export type ExcelSheet = ExcelRow[];

export interface ExcelRow {
  [columnLetter: string]: any;
}

export type Transformer = (value) => any;

export type Validator = (value) => boolean;
