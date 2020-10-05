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

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function writeToFile(obj: Record<string, any>, {
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
