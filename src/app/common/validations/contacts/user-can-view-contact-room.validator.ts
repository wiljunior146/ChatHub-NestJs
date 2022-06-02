import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ContactsService } from 'src/app/http/contacts/contacts.service';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { ObjectId } from 'mongodb';

/**
 * Validation for the user getting specific contact room.
 * 
 * @note It will only valid if the current user has contact with the
 *       passed room id or value.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserCanViewContactRoomRule', async: true })
export class UserCanViewContactRoomRule implements ValidatorConstraintInterface {
  constructor(private contactsService: ContactsService) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = validationArguments.object[REQUEST_CONTEXT];
    const total = await this.contactsService.count({
      roomId: new ObjectId(value),
      userId: new ObjectId(userId)
    });

    return !!total;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' is invalid';
  }
}
