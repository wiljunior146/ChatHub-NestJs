import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/common/interceptors/inject.user.interceptor';
import { UsersService } from 'src/models/users/users.service';
import { ObjectId } from 'mongodb';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserUniqueExceptCurrentUserRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, validationArguments: any) {
    const userId = validationArguments.object[REQUEST_CONTEXT].user._id;

    const payload: object = {
      _id: { $ne: new ObjectId(userId) },
      [validationArguments.property]: value
    };

    const totalFound = await this.usersService.count(payload);

    return !totalFound;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' already existed';
  }
}
