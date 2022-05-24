import {
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import {
  UserUniqueExceptPassedUserRule
} from '../../validations/users/user-unique-except-passed-user.validator';

export function UserUniqueExceptPassedUser(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserUniqueExceptPassedUserRule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueExceptPassedUserRule
    });
  };
}
