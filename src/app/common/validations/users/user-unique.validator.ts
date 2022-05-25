import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable()
@ValidatorConstraint({ name: 'UserUniqueRule', async: true })
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, validationArguments: any): Promise<boolean> {
    const payload: object = { [validationArguments.property]: value };

    const total = await this.usersService.count(payload);

    return !total;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' already existed';
  }
}
