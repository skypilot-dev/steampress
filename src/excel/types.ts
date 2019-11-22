/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExcelSheet = ExcelRow[];

export interface ExcelRow {
  [columnLetter: string]: any;
}

type ObjectArrayTransformer = (value: object[]) => object[];

export type Transformer = (value: any) => any;

export type Validator = (value: any) => boolean;

export interface ParseColumnOptions {
  cellTransformers?: Transformer[];
  /* TODO: If the need arises, add a `columnTransformers` property. */
  expectedHeader?: string;
  disallowEmptyCells?: boolean;
  outputProperty: string;
  validators?: Validator[];
}

export interface ParseExcelSheetOptions {
  columns: {
    [columnLetter: string]:  ParseColumnOptions;
  };
  disallowEmptyCells?: boolean;
  hasHeader?: boolean;
  /* TODO: Possibly add `cellPosttransformers` */
  globalCellTransformers?: Transformer[];
  rowTransformers?: Transformer[];
  /* TODO: Possibly rename to indicate that these transformers apply to the entire sheet */
  transformers?: ObjectArrayTransformer[];
  verbose?: boolean;
}

