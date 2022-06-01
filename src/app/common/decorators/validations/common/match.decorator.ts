import { ValidationOptions, registerDecorator } from 'class-validator';
import { MatchRule } from 'src/app/common/validations/common/match.validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MatchRule,
      constraints: [property]
    });
  };
}
