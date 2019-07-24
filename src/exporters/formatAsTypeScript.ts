import { formatAsJson } from './formatAsJson';

export interface TypeScriptFormatterOptions {
  declaredType?: string;
  imports?: string[];
}

export function formatAsTypeScript(data: object, options: TypeScriptFormatterOptions = {}): string {
  const {
    declaredType = '',
    imports = [],
  } = options;

  const importsBlock = imports.length === 0 ? '' : imports.join('\n') + '\n\n';
  const typeCast = declaredType ? `<${declaredType}>` : '';

  const jsonData = formatAsJson(data);
  return `${importsBlock}export default ${typeCast}${jsonData};`;
}
