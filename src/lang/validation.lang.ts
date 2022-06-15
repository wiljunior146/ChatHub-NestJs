/**
 * Error message to be used on IsInt validation fail.
 */
 export function isIntMessage(property: string): string  {
  return `The ${property} must be an integer.`;
}

export function isEmailMessage(property: string = 'email'): string {
  return `The ${property} must be a valid email address.`;
}

/**
 * Error message to be used on IsNotEmpty validation fail.
 */
export function isNotEmptyMessage(property: string): string  {
  return `The ${property} is required.`;
}

/**
 * Error message to be used on IsString validation fail.
 */
export function isStringMessage(property: string): string {
  return `The ${property} must be a string.`;
}

/**
 * Error message to be used on MaxLength validation fail.
 */
export function maxLengthMessage(property: string): string {
  return `The ${property} must not be greater than $constraint1 characters.`;
}

/**
 * Error message to be used on Max validation fail.
 */
export function maxMessage(property: string): string {
  return `The ${property} must not be greater than $constraint1.`;
}

/**
 * Error message to be used on Min validation fail.
 */
export function minMessage(property: string): string {
  return `The ${property} must be at least $constraint1.`;
}

/**
 * Error message to be used on IsIn validation fail.
 */
export function isInMessage(property: string): string {
  return `The selected ${property} is invalid.`;
}

/**
 * Error message to be used on UserUnique validation fail.
 */
export function userUniqueMessage(property: string): string {
  return `The ${property} has already been taken.`;
}
