import moment from 'moment';

const createValidator = (...stages) => val =>
  stages
    .reduce((errors, fn) => {
      const currentError = fn(val);
      if (stringValidator(currentError)) {
        return [...errors, currentError];
      } else {
        console.log(val, errors);
        return errors;
      }
    }, [])
    .filter(val => val !== true);

const dateValidator = val => moment(val).isValid();
const numberValidator = val => (val && !isNaN(val)) || 'Not a number';
const requiredValidator = val =>
  (val !== undefined && val !== null && val !== '') || 'Missing required value';
const stringValidator = val =>
  (val && (typeof val === 'string' || val instanceof String) && val !== '') ||
  'Not a string';

export const isDate = createValidator(dateValidator);
export const isNumber = createValidator(numberValidator);
export const isRequired = createValidator(requiredValidator);
export const isString = createValidator(stringValidator);
export const isRequiredDate = createValidator(requiredValidator, dateValidator);
export const isRequiredNumber = createValidator(requiredValidator, numberValidator);
export const isRequiredString = createValidator(requiredValidator, stringValidator);


