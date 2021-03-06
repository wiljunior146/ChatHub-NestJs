import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * User unique validation.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserUniqueRule', async: true })
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {

    const total = await this.usersRepository.count({
      [validationArguments.property]: value,
    });

    return !total;
  }
}
