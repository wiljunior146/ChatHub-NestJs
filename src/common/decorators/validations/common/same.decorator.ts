import { ValidationOptions, registerDecorator } from 'class-validator';
import { SameRule } from 'src/common/validations/common/same.validator';

export function Same(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Same',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: SameRule,
      constraints: [property]
    });
  };
}
