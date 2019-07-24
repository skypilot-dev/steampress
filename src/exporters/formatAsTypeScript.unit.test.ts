/* eslint-disable quotes */

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

  it('can declare the type of the export', () => {
    const data = { data: { nestedNumber: 1, nestedStr: 'nested' } };
    const declaredType = 'SomeType';
    const options = { declaredType };

    const typeScriptText = formatAsTypeScript(data, options);

    expect(typeScriptText).toContain(`export default <${declaredType}`);
  });

  it('can include imports', () => {
    const data = { data: { nestedNumber: 1, nestedStr: 'nested' } };
    const imports = [
      "import { SomeType } from '@src/path/to/source1'",
      "import { SomeType2 } from '@src/path/to/source2'",
    ];
    const options = { imports };

    const typeScriptText = formatAsTypeScript(data, options);

    expect(typeScriptText).toContain(`${imports[0]}\n${imports[1]}\n\n`);
  });
});
