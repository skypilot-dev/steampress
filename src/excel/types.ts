export type ExcelSheet = ExcelRow[];

export interface ExcelRow {
  [columnLetter: string]: any;
}

export type Transformer = (value: any) => any;

export type Validator = (value: any) => boolean;
