import { ValidationArguments, ValidationOptions } from 'class-validator';
import { normalCase } from './string.helper';

/**
 * Validation options for IsEmail validation.
 */
export function isEmailOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} must be a valid email address.`;
    }
  }
}

/**
 * Validation options for IsIn validation.
 */
export function isInOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The selected ${property} is invalid.`;
    }
  }
}

/**
 * Validation options for IsInt validation.
 */
export function isIntOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} must be an integer.`;
    }
  }
}

/**
 * Validation options for IsNotEmpty validation.
 */
export function isNotEmptyOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} is required.`;
    }
  }
}

/**
 * Validation options for IsString validation.
 */
export function isStringOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} must be a string.`;
    }
  }
}

/**
 * Validation options for MaxLength validation.
 */
export function maxLengthOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      const maximum = args.constraints[0];
      return `The ${property} must not be greater than ${maximum} characters.`;
    }
  }
}

/**
 * Validation options for Max validation.
 */
export function maxOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      const maximum = args.constraints[0];
      return `The ${property} must not be greater than ${maximum}.`;
    }
  }
}

/**
 * Validation options for Min validation.
 */
export function minOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      const minimum = args.constraints[0];
      return `The ${property} must be at least ${minimum}.`;
    }
  }
}

/**
 * Validation options for Same validation.
 */
export function sameOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      const comparedProperty = normalCase(args.constraints[0]);
      return `The ${property} and ${comparedProperty} must match.`;
    }
  }
}

/**
 * Validation options for UserPassword validation.
 */
export function userPasswordOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} is invalid.`;
    }
  }
}

/**
 * Validation options for UserUnique and UserUniqueWithIgnore validation.
 */
export function userUniqueOption(): ValidationOptions {
  return {
    message: (args: ValidationArguments) => {
      const property = normalCase(args.property);
      return `The ${property} has already been taken.`;
    }
  }
}
