import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';

/**
 * @note This will removed REQUEST_CONTEXT property before
 * returning the object to controller.
 */
@Injectable()
export class StripRequestContextPipe implements PipeTransform {
  transform(value: any) {
    return omit(value, REQUEST_CONTEXT);
  }
}
