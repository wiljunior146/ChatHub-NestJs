import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';

/**
 * This will removed REQUEST_CONTEXT property before
 * returning the object to controller.
 *
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 * @note We don't need the REQUEST_CONTEXT in controller since we can
 *       access all request payloads even the current user.
 *       Basically we only need it for our custom validation.
 * @note We will only stripe the REQUEST_CONTEXT property if
 *       the request is the whole request object since in the controller we
 *       can also pass a property name like on @Param decorator
 *       to get a specific property so there will be no need to stripe the request.
 *       IE: @Param('id')
 */
@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  transform(value: any): object {
    return typeof value === 'object'
      ? omit(value, REQUEST_CONTEXT)
      : value;
  }
}
