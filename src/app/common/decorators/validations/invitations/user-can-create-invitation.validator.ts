import { ValidationOptions, registerDecorator } from 'class-validator';
import {
  UserCanCreateInvitationRule
} from 'src/app/common/validations/invitations/user-can-create-invitation.validator';

export function UserCanCreateInvitation(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserCanCreateInvitation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserCanCreateInvitationRule
    });
  };
}
