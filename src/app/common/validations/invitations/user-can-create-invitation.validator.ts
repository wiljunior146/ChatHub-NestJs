import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { ObjectId } from 'mongodb';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { ContactsService } from 'src/app/http/contacts/contacts.service';

/**
 * Validation for the user creating a new invitation.
 * 
 * @note It will only valid if the current user doesn't have
 *       existing contact and invitation with passed user or value.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserCanCreateInvitationRule', async: true })
export class UserCanCreateInvitationRule implements ValidatorConstraintInterface {
  constructor(
    private contactsService: ContactsService,
    private invitationsService: InvitationsService
  ) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = new ObjectId(validationArguments.object[REQUEST_CONTEXT]);
    const invitedUserId = new ObjectId(value);
    const totalContact = await this.contactsService.count({
      contactableId: invitedUserId,
      userId
    });
    
    return !totalContact
      ? ! await this.invitationsService.count({ invitedUserId, userId })
      : false;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' is invalid';
  }
}
