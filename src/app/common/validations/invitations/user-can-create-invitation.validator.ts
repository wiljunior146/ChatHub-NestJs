import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/app/models/contact.entity';
import { MongoRepository } from 'typeorm';
import { Invitation } from 'src/app/models/invitation.entity';

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
    const userId = new ObjectId(validationArguments.object[REQUEST_CONTEXT]);
    const invitedUserId = new ObjectId(value);
    const totalContact = await this.contactsRepository.count({
      contactableId: invitedUserId,
      userId
    });
    
    return !totalContact
      ? ! await this.invitationsRepository.count({ invitedUserId, userId })
      : false;
  }
}
