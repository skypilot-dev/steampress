/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transformer } from './types';

export function transform(initialValue: any, transformers: Transformer[]): any {
  let transformedValue = initialValue;
  transformers.forEach((transformFn) => {
    transformedValue = transformFn(transformedValue);
  });
  return transformedValue;
}
