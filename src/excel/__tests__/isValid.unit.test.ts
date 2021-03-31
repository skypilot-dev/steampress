import {
  CELL_DATA_TYPE_SUPERTYPES,
  CELL_DATA_TYPES,
  IsValidOptions,
  isValid,
} from '../isValid';
import { CellDataType, Validator } from '../types';


const samplePermittedValues = {
  boolean: true,
  date: new Date(2018, 0, 1),
  integer: 1,
  number: 1.5,
  string: 'allowed',
};


describe('isValid(:cellValidators, :options)', () => {
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
  describe('options.cellValidators', () => {
    const isNumber: Validator = (cellValue): boolean => typeof cellValue === 'number';
    const isTruthy: Validator = (cellValue): boolean => !!cellValue;
    const isString: Validator = (cellValue): boolean => typeof cellValue === 'string';
    const isShort: Validator = (cellValue): boolean => cellValue.length < 5;

    it('if all cellValidators return true, should return true', () => {
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
      CELL_DATA_TYPES.forEach((dataType: CellDataType) => {
        const value = samplePermittedValues[dataType];
        const options: IsValidOptions = {
          allowUndefined: false,
          dataType,
        };
        const valueIsValid = isValid(value, options);
        expect(valueIsValid).toBe(true);
      });
    });

    it('if dataType is set and the value is not of that type, should return false', () => {
      CELL_DATA_TYPES.forEach((dataType: CellDataType) => {
        CELL_DATA_TYPES
          .filter((valueDataType) => valueDataType !== dataType)
          .filter((valueDataType) => {
            const supertypes = CELL_DATA_TYPE_SUPERTYPES[valueDataType] || [];
            return !supertypes.includes(dataType);
          })
          .forEach((valueDataType) => {
            const options: IsValidOptions = {
              allowUndefined: false,
              dataType,
            };
            const value = samplePermittedValues[valueDataType];
            const valueIsValid = isValid(value, options);
            expect(valueIsValid).toBe(false);
          });
      });
    });
  });
});
