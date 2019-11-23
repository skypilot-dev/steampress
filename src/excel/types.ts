/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { Integer, JsonObject } from '@skypilot/common-types';


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
  defaultValue?: any;
  disallowEmptyCellsInColumn?: boolean;
  expectedHeader?: string;
  ignoreRowIfTruthy?: boolean; // provides a way to selectively ignore rows
  outputProperty?: string;
  validators?: Validator[];
}

export interface ParseRowOptions {
  columns: {
    [columnLetter: string]:  ParseColumnOptions;
  };
  disallowEmptyCellsInRow?: boolean;
  globalCellTransformers?: Transformer[];
  rowIndex?: Integer;
  rowTransformers?: Transformer[];
  verbose?: boolean;
}

export interface ParseSheetOptions {
  columns: {
    [columnLetter: string]:  ParseColumnOptions;
  };
  /* `disallowEmptyCellsInSheet=true` is equivalent to setting `disallowEmptyCellsInColumn=true`
   * in all columns. The latter, if set, overrides the former. */
  disallowEmptyCellsInSheet?: boolean;
  globalCellTransformers?: Transformer[];
  hasHeader?: boolean;
  rowTransformers?: Transformer[];
  sheetTransformers?: ObjectArrayTransformer[];
  verbose?: boolean;
}

