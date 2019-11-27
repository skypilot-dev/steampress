import { Validator } from '../excel/types';


type MatchesPatternOptions = {
  ignoreCase?: boolean;
};

/* Return `true` if the string consists strictly of a series of alphabetical characters followed by
 * a series of digits; otherwise, return false. */
function doMatchesPattern(pattern: string, options: MatchesPatternOptions, str: string): boolean {
  const {
    ignoreCase = false,
  } = options;
  const flags = ignoreCase ? 'i' : '';
  const regExp = new RegExp(pattern, flags);
  return !!str.match(regExp);
}

export function matchesPattern(pattern: string, options: MatchesPatternOptions = {}): Validator {
  return (str: string) => doMatchesPattern(pattern, options, str);
}
