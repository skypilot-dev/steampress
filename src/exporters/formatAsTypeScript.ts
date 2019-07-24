import { formatAsJson } from './formatAsJson';

export interface TypeScriptFormatterOptions {
  declaredType?: string;
}

export function formatAsTypeScript(data: object, options: TypeScriptFormatterOptions = {}): string {
  const {
    declaredType = '',
  } = options;

  const typeCast = declaredType ? `<${declaredType}>` : '';

  const jsonData = formatAsJson(data);
  return `export default ${typeCast}${jsonData};`;
}
