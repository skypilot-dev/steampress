/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { Integer, JsonObject } from '@skypilot/common-types';


/* -- Typings -- */
export type CellDataType = LiteralCellDataType | 'date' | 'integer';

export type ExcelSheet = ExcelRow[];

export type IgnoreRowIf = 'empty' | 'falsy' | 'truthy'

export type LiteralCellDataType = 'boolean' | 'number' | 'string';

type ObjectArrayTransformer = (value: JsonObject[]) => JsonObject[];

export type Transformer = (value: any) => any;

export type Validator = (value: any) => boolean;

export interface ExcelRow {
  [columnLetter: string]: any;
}

export interface ParseColumnOptions {
  cellTransformers?: Transformer[];
  cellValidators?: Validator[];
  dataType?: CellDataType;
  defaultValue?: any;
  disallowEmptyCellsInColumn?: boolean; // ignored if `defaultValue` is set or `ignoreRowIf='empty'`
  exclude?: boolean | ((...args: any[]) => boolean); // if true, exclude this column from the output
  expectedHeader?: string;
  ignoreRowIf?: IgnoreRowIf; // ignored if `defaultValue` is set
  ignoreRowIfFalsy?: boolean; // DEPRECATED
  ignoreRowIfTruthy?: boolean; // DEPRECATED
  outputProperty?: string;
  permittedValues?: any[];
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

