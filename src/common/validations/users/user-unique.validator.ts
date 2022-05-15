import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';

@ValidatorConstraint({ name: 'UserUniqueRule', async: true })
@Injectable()
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, validationArguments: any) {
    const property: string = validationArguments.property;
    const payload: object = {};
    payload[property] = value;

    const totalFound = await this.usersService.count(payload);

    return !totalFound;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + ' already existed.';
  }
}
