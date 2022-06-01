import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';

/**
 * Validation for checking two properties.
 * 
 * @note It will only valid if the value of current property matched the
 *       value of the passed property name.
 */
@Injectable()
@ValidatorConstraint({name: 'Match'})
export class MatchRule implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments): boolean {
    const [property] = args.constraints;
    const relatedValue = (args.object as any)[property];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const [property] = args.constraints;
    return `${property} and ${args.property} don't match`;
  }
}
