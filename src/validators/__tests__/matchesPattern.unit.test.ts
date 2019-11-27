import { matchesPattern } from '../matchesPattern'

describe('matchesPattern(:pattern, :options?)(:string)', () => {
  it('should return `true` if the string matches the pattern', () => {
    const str = 'A';
    const pattern = '[A-Z]';
    const isMatch = matchesPattern(pattern)(str);
    expect(isMatch).toBe(true);
  });

  it('should return `false` if the string does not match the pattern', () => {
    const str = 'a';
    const pattern = '[A-Z]';
    const isMatch = matchesPattern(pattern)(str);
    expect(isMatch).toBe(false);
  });

  it('if `ignoreCase=true`, should return `true` if, disregarding case, the string matches the pattern', () => {
    const str = 'a';
    const pattern = '[A-Z]$';
    const isMatch = matchesPattern(pattern, { ignoreCase: true })(str);
    expect(isMatch).toBe(true);
  });
});
