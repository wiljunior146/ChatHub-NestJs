import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/models/contacts/entities/contact.entity';
import { MongoRepository } from 'typeorm';
import { Invitation } from 'src/models/invitations/entities/invitation.entity';

/**
 * Validation for the user creating a new invitation.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserCanCreateInvitationRule', async: true })
export class UserCanCreateInvitationRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: MongoRepository<Contact>,
    @InjectRepository(Invitation)
    private invitationsRepository: MongoRepository<Invitation>
  ) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {

    const userId = validationArguments.object[REQUEST_CONTEXT];
    const totalContact = await this.contactsRepository.count({
      contactableId: value,
      userId
    });
    
    return !totalContact
      ? ! await this.invitationsRepository.count({ invitedUserId: value, userId })
      : false;
  }
}
