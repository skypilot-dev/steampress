import { rmdirSync } from 'fs';

import { createDirIfNonexistent } from '../createDirIfNonexistent';

describe('createDirIfNonexistent', () => {
  it('should return false if the dir exists', () => {
    const dirName = 'src';
    expect(createDirIfNonexistent(dirName)).toBe(false);
  });


  it('should return true if the dir is successfully created', () => {
    const dirName = 'tests/createDirIfNonexistent.tmp';
    const dirWasCreated = createDirIfNonexistent(dirName);
    rmdirSync(dirName);
    expect(dirWasCreated).toBe(true);
  });


  it('should throw an error if the dir cannot be created', () => {
    const dirName = '/createDirTest';
    expect(() => {
      createDirIfNonexistent(dirName);
    }).toThrowError();
  });
});
