import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';

/**
 * This will removed REQUEST_CONTEXT property before
 * returning the object to controller.
 *
 * @note We don't need the REQUEST_CONTEXT in controller since we can
 *       access all request payloads and even the current user.
 *       Basically we only need it for our custom validation.
 *
 * @see  src/common/decorators/inject.user.decorator.ts
 */
@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  transform(value: any) {
    return omit(value, REQUEST_CONTEXT);
  }
}
