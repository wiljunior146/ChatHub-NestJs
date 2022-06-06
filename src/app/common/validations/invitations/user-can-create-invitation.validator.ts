import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { ObjectID } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/app/entities/contact.entity';
import { MongoRepository } from 'typeorm';
import { Invitation } from 'src/app/entities/invitation.entity';

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
    if (! ObjectID.isValid(value)) return false;

    const userId = new ObjectID(validationArguments.object[REQUEST_CONTEXT]);
    const invitedUserId = new ObjectID(value);
    const totalContact = await this.contactsRepository.count({
      contactableId: invitedUserId,
      userId
    });
    
    return !totalContact
      ? ! await this.invitationsRepository.count({ invitedUserId, userId })
      : false;
  }
}
