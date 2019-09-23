/* Add the key:value pair to the object and return it. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addProperty({ key, value }: { key: string; value: any }, obj): void {
  /* If overwrites are desired, create a new function named `setProperty` and use that. */
  if (Object.keys(obj).includes(key)) {
    throw new Error(`The property '${key}' already exists on the object.`);
  }
  obj[key] = value;
  return obj;
}
