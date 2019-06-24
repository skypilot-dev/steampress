import { formatAsJson } from './formatAsJson';

describe('formatAsJson()', () => {
  it('should convert an object to Json', () => {
    const data = { data: { nestedNumber: 1, nestedStr: 'nested' } };
    const jsonData = formatAsJson(data);

    const firstChar = jsonData[0];
    const lastChar = jsonData.slice(-1);

    expect(firstChar).toBe('{');
    expect(lastChar).toBe('}');
  });


  it('should convert an array to Json', () => {
    const data = [
      { data: { nestedNumber: 1, nestedStr: 'nested' } },
    ];
    const jsonData = formatAsJson(data);

    const firstChar = jsonData[0];
    const lastChar = jsonData.slice(-1);

    expect(firstChar).toBe('[');
    expect(lastChar).toBe(']');
  });
});
