import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import { User } from 'src/models/users/entities/user.entity';
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
      [validationArguments.property]: value
    });

    return !total;
  }
}
