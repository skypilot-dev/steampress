/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { JsonObject } from '@skypilot/common-types';


/* -- Typings -- */
export type ExcelSheet = ExcelRow[];

export interface ExcelRow {
  [columnLetter: string]: any;
}

type ObjectArrayTransformer = (value: JsonObject[]) => JsonObject[];

export type Transformer = (value: any) => any;

export type Validator = (value: any) => boolean;

export interface ParseColumnOptions {
  cellTransformers?: Transformer[];
  expectedHeader?: string;
  disallowEmptyCells?: boolean;
  outputProperty: string;
  validators?: Validator[];
}

export interface ParseSheetOptions {
  columns: {
    [columnLetter: string]:  ParseColumnOptions;
  };
  disallowEmptyCells?: boolean;
  globalCellTransformers?: Transformer[];
  hasHeader?: boolean;
  rowTransformers?: Transformer[];
  /* TODO: Possibly rename to indicate that these transformers apply to the entire sheet */
  transformers?: ObjectArrayTransformer[];
  verbose?: boolean;
}

