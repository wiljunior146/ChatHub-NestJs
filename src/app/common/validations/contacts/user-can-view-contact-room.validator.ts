import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { REQUEST_CONTEXT } from '../../constants/request.constant';

@Injectable()
@ValidatorConstraint({ name: 'UserCanViewContactRoomRule', async: true })
export class UserCanViewContactRoomRule implements ValidatorConstraintInterface {
  constructor(private contactsService: ContactsService) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = validationArguments.object[REQUEST_CONTEXT];
    const total = await this.contactsService.count({
      roomId: value,
      userId
    });

    return !!total;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' is invalid';
  }
}
