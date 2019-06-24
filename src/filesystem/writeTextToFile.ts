/* TODO: Support output formats other than JSON */

import { writeFileSync } from 'fs';

import { createDirIfNonexistent } from './createDirIfNonexistent';


export interface WriteTextToFileOptions {
  dirName: string;
  fileName: string;
}

export function writeTextToFile(data, options: WriteTextToFileOptions): void {

  const { dirName, fileName } = options;

  createDirIfNonexistent(dirName);

  writeFileSync(
    `${dirName}/${fileName}`,
    data
  );
}
