import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import { UsersService } from 'src/app/services/users/users.service';
import { ObjectId } from 'mongodb';

/**
 * User unique with ignore validation.
 * 
 * @note It will only walid if the value of the current property doesn't
 *       exists on our database except the value is being ignored.
 */
@Injectable()
@ValidatorConstraint({ name: 'UserUniqueWithIgnoreRule', async: true })
export class UserUniqueWithIgnoreRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  /**
   * Validate if the property is unique except for the passed User ID.
   *
   * @note   The REQUEST_CONTEXT property must contain the User ID.
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

    const total = await this.usersService.count(payload);

    return !total;
  }

  defaultMessage(args: ValidationArguments): string {
    return args.property + ' already existed';
  }
}
