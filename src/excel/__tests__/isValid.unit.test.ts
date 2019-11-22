import { isValid } from '../isValid';
import { Validator } from '../types';

describe('isValid(:validators, :options)', () => {
  describe('options.allowUndefined', () => {
    it('if allowUndefined=true and the value is undefined, should return false', () => {
      const value = undefined;
      const options = {
        allowUndefined: true,
      };
      expect(isValid(value, options)).toBe(true);
    });

    it('if allowUndefined=false and the value is defined, should return true', () => {
      const value = 1;
      const options = {
        allowUndefined: false,
      };

      expect(isValid(value, options)).toBe(true);
    });

    it('if allowUndefined=false and the value is undefined, should return false', () => {
      const value = undefined;
      const options = {
        allowUndefined: false,
      };

      expect(isValid(value, options)).toBe(false);
    });

    it('if allowUndefined=true and the value is undefined, should return true', () => {
      const value = undefined;
      const options = {
        allowUndefined: true,
      };

      expect(isValid(value, options)).toBe(true);
    });
  });
  describe('options.validators', () => {
    const isNumber: Validator = (cellValue): boolean => typeof cellValue === 'number';
    const isTruthy: Validator = (cellValue): boolean => !!cellValue;
    const isString: Validator = (cellValue): boolean => typeof cellValue === 'string';
    const isShort: Validator = (cellValue): boolean => cellValue.length < 5;

    it('if all validators return true, should return true', () => {
      const value = '1234';
      const valueIsValid = isValid(value, { validators: [isString, isTruthy, isShort] });
      expect(valueIsValid).toBe(true);
    });

    it('if any validator returns false, should return false', () => {
      const cellValue = '1234';
      const valueIsValid = isValid(cellValue, { validators: [isTruthy, isShort, isNumber] });
      expect(valueIsValid).toBe(false);
    });

    it('if any validator returns false, should return false', () => {
      const cellValue = '1234';
      const valueIsValid = isValid(cellValue, { validators: [isTruthy, isShort, isNumber] });
      expect(valueIsValid).toBe(false);
    });
  });
});
