import {
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import {
  UserUniqueExceptCurrentUserRule
} from 'src/common/validations/users/user-unique-except-current-user.validator';

export function UserUniqueExceptCurrentUser(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserUniqueExceptCurrentUser',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueExceptCurrentUserRule
    });
  };
}
