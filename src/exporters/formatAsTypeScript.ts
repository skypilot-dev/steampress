import { formatAsJson } from './formatAsJson';

export interface TypeScriptFormatterOptions {
  declaredType?: string;
  exportName?: string;
  imports?: string[];
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function formatAsTypeScript(data: Record<string, any>, options: TypeScriptFormatterOptions = {}): string {
  const {
    declaredType = '',
    exportName = 'default',
    imports = [],
  } = options;

  const importsBlock = imports.length === 0 ? '' : imports.join('\n') + '\n\n';

  let exportStatement: string;
  if (exportName === 'default') {
    if (declaredType) {
      exportStatement = `export default <${declaredType}>`;
    } else {
      exportStatement = 'export default ';
    }
  } else {
    if (declaredType) {
      exportStatement = `export const ${exportName}: ${declaredType} = `;
    } else {
      exportStatement = `export const ${exportName} = `;
    }
  }

  const jsonData = formatAsJson(data);

  return `${importsBlock}${exportStatement}${jsonData};`;
}
