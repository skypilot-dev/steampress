import { curry } from '@skypilot/sugarbowl';

/* Given an object and the name of source and target properties, clone the object, add the target
 * property to (giving it the value held in the source property), and return the new object. */
function doDuplicateProperty(
  sourceProperty: string,
  targetProperty: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  obj: { [key: string]: any },
): object {
  /* Clone the object and add the requested targed property, setting its value to that of the
   * source property */
  return Object.assign({}, obj, {
    [targetProperty]: obj[sourceProperty],
  });
}

export const duplicateProperty = curry(doDuplicateProperty);

/* TODO: Handle edge cases, including
 * - nonexistent source property
 * - nested path specified as source property (e.g., `sourceWithNestedObject.nestedProperty`)
 * */
