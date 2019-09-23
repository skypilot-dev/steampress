import { addProperty } from '../addProperty';

describe('addProperty(:object, { key, value })', () => {
  it('should add the key:value pair to the object and return it', () => {
    const original = { numberProp: 1, stringProp: 'value' };

    const actual = addProperty({ key: 'newStringProp', value: 'new value' }, original);
    const expected = { numberProp: 1, stringProp: 'value', newStringProp: 'new value' };

    expect(actual).toBe(original);
    expect(actual).toEqual(expected);
  });

  it('should modify the original object', () => {
    const original = {};

    addProperty({ key: 'numberProp', value: 0 }, original);
    const expected = { numberProp: 0 };

    expect(original).toEqual(expected);
  });

  it('should throw an error if the key already exists', () => {
    const original = { stringProp: 'original value' };

    expect(() => {
      addProperty({ key: 'stringProp', value: 'overwritten value' }, original);
    }).toThrow();
  });
});
