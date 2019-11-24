import { IsValidOptions, isValid } from '../isValid';
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

  describe('options.dataType', () => {
    it('if dataType is set and the value is of that type, should return true', () => {
      const value = 1;
      const options: IsValidOptions = {
        allowUndefined: false,
        dataType: 'number',
      };
      const valueIsValid = isValid(value, options);
      expect(valueIsValid).toBe(true);
    });

    it('if dataType is set and the value is not of that type, should return false', () => {
      const value = 'text';
      const options: IsValidOptions = {
        allowUndefined: false,
        dataType: 'number',
      };
      const valueIsValid = isValid(value, options);
      expect(valueIsValid).toBe(false);
    });

    it('if dataType is not set but the value is not one of the permitted types, should return false', () => {
      const value: [] = [];
      const options: IsValidOptions = {
        allowUndefined: false,
      };
      const valueIsValid = isValid(value, options);
      expect(valueIsValid).toBe(false);
    });

    it("if dataType is set to 'date' and the value is a date, should return true", () => {
      const value = new Date();
      const options: IsValidOptions = {
        allowUndefined: false,
        dataType: 'date',
      };
      const valueIsValid = isValid(value, options);
      expect(valueIsValid).toBe(true);
    });
  });
});
