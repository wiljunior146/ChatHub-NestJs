import {
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import { UserPasswordRule } from '../../../validations/users/user-password.validator';

export function UserPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserPasswordRule
    });
  };
}
