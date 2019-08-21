/* TODO: Support output formats other than JSON */


import { existsSync, mkdirSync, writeFileSync } from 'fs';


export interface WriteToFileOptions {
  baseName: string;
  format?: 'json';
  outDir: string;
}

/* -- Helper functions */
function createDirIfNonexistent(dir: string): void {
  if (!existsSync(dir)){
    mkdirSync(dir);
  }
}
/* -- End of helper functions */

export function writeToFile(obj, {
  baseName,
  // format = 'json',
  outDir = '.',
}: WriteToFileOptions): void {

  if (!baseName.includes('.')) {
    baseName += '.json';
  }

  createDirIfNonexistent(outDir);

  writeFileSync(
    `${outDir}/${baseName}`,
    JSON.stringify(obj, undefined, 2),
  );
}
