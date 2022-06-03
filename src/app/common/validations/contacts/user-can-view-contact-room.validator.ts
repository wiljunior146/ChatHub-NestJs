import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from '../../constants/request.constant';
import { ObjectId } from 'mongodb';
import { Contact } from 'src/app/models/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

/**
 * Validation for the user getting specific contact room.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserCanViewContactRoomRule', async: true })
export class UserCanViewContactRoomRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: MongoRepository<Contact>
  ) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = validationArguments.object[REQUEST_CONTEXT];

    const total = await this.contactsRepository.count({
      roomId: new ObjectId(value),
      userId: new ObjectId(userId)
    });

    return !!total;
  }
}
