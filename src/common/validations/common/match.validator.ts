import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({name: 'Match'})
export class MatchRule implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [property] = args.constraints;
    const relatedValue = (args.object as any)[property];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [property] = args.constraints;
     return `${property} and ${args.property} don't match`;
  }
}
