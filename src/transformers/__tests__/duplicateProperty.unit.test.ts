import { duplicateProperty } from '../duplicateProperty';

describe('duplicateProperty(:source)', () => {
  const originalObj =  {
    source: 'string value',
    extraString: 'another string value',
    extraNumber: 1,
    nestedObj: {
      a: 'nested.a',
      b: ['a nested string'],
    },
  };

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  let newObj: any;
  it('should return an object with all properties of the original object plus the duplicated property under a new name', () => {
    newObj = duplicateProperty('source', 'target')(originalObj);
    expect(newObj).toMatchObject({
      source: 'string value',
      target: 'string value',
      extraString: 'another string value',
      extraNumber: 1,
      nestedObj: {
        a: 'nested.a',
        b: ['a nested string'],
      },
    });
  });


  it('should not modify the original object', () => {
    expect(originalObj).not.toBe(newObj);
  });


  it('should correctly copy (not clone) a source property that holds an object', () => {
    const objWithObjectSource = {
      source: { arrayProp: ['a', 'b', 'c'] },
    };
    newObj = duplicateProperty('source', 'target', objWithObjectSource);
    expect(newObj['target']).toEqual(objWithObjectSource.source);

    /* Revise this test if deep merging is implemented */
    expect(newObj['target']).toBe(objWithObjectSource.source);
    // expect(newObj['target']).not.toBe(objWithObjectSource.source);
  });


  it('should be able to copy `null` from source to target', () => {
    const objWithNull = { source: null };
    const duplicatePropertyFn = duplicateProperty('source', 'target');
    newObj = duplicatePropertyFn(objWithNull);

    expect(newObj).toHaveProperty('target');
    expect(newObj['target']).toBeNull();
  });

});
