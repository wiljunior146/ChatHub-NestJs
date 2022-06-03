import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import { ObjectId } from 'mongodb';
import { User } from 'src/app/models/user.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * User unique with ignore validation.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserUniqueWithIgnoreRule', async: true })
export class UserUniqueWithIgnoreRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>
  ) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = validationArguments.object[REQUEST_CONTEXT];

    const total = await this.usersRepository.count({
      _id: { $ne: new ObjectId(userId) },
      [validationArguments.property]: value
    });

    return !total;
  }
}
