import { duplicateProperty } from '../duplicateProperty';

describe('duplicateProperty()', () => {

  const originalObj =  {
    source: 'string value',
    extraString: 'another string value',
    extraNumber: 1,
    nestedObj: {
      a: 'nested.a',
      b: ['a nested string'],
    },
  };

  let newObj: any;
  it('should return an object with all properties of the original object', () => {
    newObj = duplicateProperty('source', 'target', originalObj);
    expect(newObj).toHaveProperty('source');
    expect(newObj).toHaveProperty('extraString');
    expect(newObj).toHaveProperty('extraNumber');

    expect(newObj).toHaveProperty('nestedObj.b');
    expect(Array.isArray(newObj.nestedObj.b)).toBe(true);
    expect(newObj.nestedObj.b[0]).toBe('a nested string');
  });


  it('should also have the new target property with the same value as the source property', () => {
    expect(newObj).toHaveProperty('target');
    expect(newObj.target).toBe('string value');
  });


  it('should not modify the original object', () => {
    expect(originalObj).not.toBe(newObj);
  });


  it('should correctly copy (not clone) a source property that holds an object', () => {
    const objWithObjectSource = {
      source: { arrayProp: ['a', 'b', 'c'] },
    };
    const newObj: any = duplicateProperty('source', 'target', objWithObjectSource);
    expect(newObj['target']).toEqual(objWithObjectSource.source);

    /* Revise this test if deep merging is implemented */
    expect(newObj['target']).toBe(objWithObjectSource.source);
    // expect(newObj['target']).not.toBe(objWithObjectSource.source);
  });


  it('should be able to copy `null` from source to target', () => {
    const objWithNull = { source: null };
    const newObj: any = duplicateProperty('source', 'target', objWithNull);

    expect(newObj).toHaveProperty('target');
    expect(newObj['target']).toBeNull();
  });

});
