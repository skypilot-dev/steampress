import { formatAsJson } from './formatAsJson';

export interface TypeScriptFormatterOptions {
  declaredType?: string;
}

export function formatAsTypeScript(data: object, options: TypeScriptFormatterOptions = {}): string {
  const {
    declaredType = '',
  } = options;

  const typePhrase = declaredType ? ` as ${declaredType}` : '';

  const jsonData = formatAsJson(data);
  return `export default ${jsonData}${typePhrase};`;
}
