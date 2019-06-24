import { formatAsTypeScript } from './formatAsTypeScript';

describe('formatAsTypeScript()', () => {
  it('should export an object as the default object encoded in JSON', () => {
    const data = { data: { nestedNumber: 1, nestedStr: 'nested' } };
    const typeScriptText = formatAsTypeScript(data);

    const startingText = typeScriptText.slice(0, 16);
    const endingText = typeScriptText.trimRight().slice(-2);

    expect(startingText).toBe('export default {');
    expect(endingText).toBe('};');
  });
});