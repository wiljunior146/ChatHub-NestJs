import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import { User } from 'src/models/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * User unique with ignore validation.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserPasswordRule', async: true })
export class UserPasswordRule implements ValidatorConstraintInterface {

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const user: User = validationArguments.object[REQUEST_CONTEXT];
    console.log(value)
    console.log(user.password);
    return true;
  }
}
