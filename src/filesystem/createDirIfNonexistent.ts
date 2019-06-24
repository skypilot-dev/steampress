import { existsSync, mkdirSync } from 'fs';

export function createDirIfNonexistent(dir: string): boolean {
  let dirWasCreated = false;
  if (!existsSync(dir)) {
    try {
      mkdirSync(dir);
    } catch (err) {
      throw new Error(`Could not create directory ${dir}. ${err.message}`);
    }
    dirWasCreated = true;
  }
  return dirWasCreated;
}
