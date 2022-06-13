import {
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import {
  UserCanViewContactRoomRule
} from 'src/common/validations/contacts/user-can-view-contact-room.validator';
  
export function UserCanViewContactRoom(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserCanViewContactRoom',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserCanViewContactRoomRule
    });
  };
}
