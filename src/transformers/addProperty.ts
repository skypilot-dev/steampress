/* eslint-disable @typescript-eslint/no-explicit-any */
import { curry } from '@skypilot/sugarbowl';


type KeyValuePair = { key: string; value: any }


/* Add the key:value pair to the object and return it. */
export function doAddProperty(
  { key, value }: KeyValuePair,
  obj: { [key: string]: any },
): { [key: string]: any } {
  /* If overwrites are desired, create a new function named `setProperty` and use that. */
  if (Object.keys(obj).includes(key)) {
    throw new Error(`The property '${key}' already exists on the object.`);
  }
  obj[key] = value;
  return obj;
}

export const addProperty = curry(doAddProperty);
