import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import { UsersService } from 'src/app/services/users/users.service';
import { ObjectId } from 'mongodb';

@Injectable()
@ValidatorConstraint({ name: 'UserUniqueWithIgnoreRule', async: true })
export class UserUniqueWithIgnoreRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  /**
   * Validate if the property is unique except for the current user.
   *
   * @note   To get the user object the user object must be injected from the controller
   *         using interceptors.
   * @param  {string}  value
   * @param  {any}     validationArguments
   * @return {boolean}
   */
  async validate(value: string, validationArguments: any): Promise<boolean> {
    const userId = validationArguments.object[REQUEST_CONTEXT];

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
  