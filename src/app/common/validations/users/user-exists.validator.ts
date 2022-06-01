import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';

/**
 * User exists validation.
 * 
 * @note It will only walid if the user's Id or value of the current property
 *       exists on our database.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserExistsRule', async: true })
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: any, validationArguments: any): Promise<boolean> {

    const [property] = validationArguments.constraints;
    const payload: object = { [property]: value };
    const user = await this.usersService.findOne(payload);

    return !!user;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' is invalid';
  }
}
