import { ValidationOptions, registerDecorator } from 'class-validator';
import { UserUniqueRule } from 'src/app/common/validations/users/user-unique.validator';

export function UserUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueRule
    });
  };
}
