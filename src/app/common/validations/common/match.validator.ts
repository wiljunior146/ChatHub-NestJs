import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';

/**
 * Validate if the property value is match on the value of the passed property.
 */
@Injectable()
@ValidatorConstraint({name: 'Match'})
export class MatchRule implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments): boolean {
    const [property] = args.constraints;
    const relatedValue = (args.object as any)[property];
    return value === relatedValue;
  }
}
