import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/entities/user.entity';
import { MongoRepository } from 'typeorm';

/**
 * User exists validation.
 * 
 * @note It will only walid if the user's Id or value of the current property
 *       exists on our database.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserExistsRule', async: true })
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>
  ) {}

  async validate(value: any, validationArguments: any): Promise<boolean> {

    const [property] = validationArguments.constraints;
    const user = await this.usersRepository.findOne({ [property]: value });

    return !!user;
  }
}
