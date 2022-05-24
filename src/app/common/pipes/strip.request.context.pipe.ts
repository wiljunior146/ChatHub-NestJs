import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';

/**
 * This will removed REQUEST_CONTEXT property before
 * returning the object to controller.
 *
 * @see  src/app/common/decorators/inject.user.decorator.ts for sample.
 * @note We don't need the REQUEST_CONTEXT in controller since we can
 *       access all request payloads even the current user.
 *       Basically we only need it for our custom validation.
 */
@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  transform(value: any): object {
    return omit(value, REQUEST_CONTEXT);
  }
}
