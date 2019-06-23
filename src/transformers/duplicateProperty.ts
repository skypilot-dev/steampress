/* Given an object and the name of source and target properties, clone the object, add the target
 * property to (giving it the value held in the source property), and return the new object. */

export function duplicateProperty(sourceProperty: string, targetProperty: string, obj: object): object {
  /* Clone the object and add the requested targed property, setting its value to that of the
   * source property */
  const newObj = Object.assign({}, obj, {
    [targetProperty]: obj[sourceProperty],
  });
  return newObj;
}

/* TODO: Handle edge cases, including
 * - nonexistent source property
 * - nested path specified as source property (e.g., `sourceWithNestedObject.nestedProperty`)
 * */
