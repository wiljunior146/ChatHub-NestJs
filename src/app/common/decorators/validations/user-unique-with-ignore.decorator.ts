import {
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import {
  UserUniqueWithIgnoreRule
} from 'src/app/common/validations/users/user-unique-with-ignore.validator';

export function UserUniqueWithIgnore(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserUniqueWithIgnore',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueWithIgnoreRule
    });
  };
}
