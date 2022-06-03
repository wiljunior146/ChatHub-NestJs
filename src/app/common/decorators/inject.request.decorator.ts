import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { StripRequestContextPipe } from 'src/app/common/pipes/strip.request.context.pipe';
import { InjectRequestInterceptor } from '../interceptors/inject.request.interceptor';
import { Request } from 'src/app/common/enums/request.enum';

/**
 * Injecting request property to another request type to be able
 * to use on custom class validator.
 *
 * @see https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectRequest(
  from: Request.Query | Request.Body | Request.Params,
  to: Request.Query | Request.Body | Request.Params,
  property?: string
) {
  if (from === to) {
    throw Error('The request object type "from" and "to" must not be the same.');
  }

  return applyDecorators(
    UseInterceptors(new InjectRequestInterceptor(from, to, property)),
    UsePipes(StripRequestContextPipe)
  );
}
