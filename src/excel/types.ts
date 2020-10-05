/* eslint-disable @typescript-eslint/no-explicit-any */
/* -- Imports -- */
import { Integer, JsonMap } from '@skypilot/common-types';

/* -- Typings -- */
export type CellDataType = LiteralCellDataType | 'date' | 'integer';

export type ExcelSheet = ExcelRow[];

export type IgnoreRowIf = 'empty' | 'falsy' | 'truthy'

export type LiteralCellDataType = 'boolean' | 'number' | 'string';

type ObjectArrayTransformer = (value: JsonMap[]) => JsonMap[];

export type Transformer = (value: any) => any;

export type Validator = (value: any) => boolean;

export interface ExcelRow {
  [columnLetter: string]: any;
}

export interface ParseColumnOptions {
  cellPrevalidationTransformers?: Transformer[];
  cellTransformers?: Transformer[];
  cellValidators?: Validator[];
  dataType?: CellDataType;
  defaultValue?: any;
  disallowEmptyCellsInColumn?: boolean; // ignored if `defaultValue` is set or `ignoreRowIf='empty'`
  excludeThisColumn?: boolean | ((...args: any[]) => boolean);
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
