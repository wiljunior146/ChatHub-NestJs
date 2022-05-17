import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
@ValidatorConstraint({ name: 'UserUniqueRule', async: true })
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, validationArguments: any) {
    const payload: object = { [validationArguments.property]: value };

    const totalFound = await this.usersService.count(payload);

    return !totalFound;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + ' already existed';
  }
}
