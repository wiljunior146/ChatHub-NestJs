import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { StripRequestContextPipe } from 'src/app/common/pipes/strip.request.context.pipe';
import { InjectParamsInterceptor } from '../interceptors/inject.request.interceptor';
import { Request } from 'src/app/common/enums/request.enum';

/**
 * Injecting request object to a specified context to be able to use on custom class validator.
 *
 * @see    https://github.com/AvantaR/nestjs-validation-tips
 * @param  {Request.Query | Request.Body | Request.Params}  from
 * @param  {Request.Query | Request.Body | Request.Params}  to
 * @return {void}
 */
export function InjectRequest(
  from: Request.Query | Request.Body | Request.Params,
  to: Request.Query | Request.Body | Request.Params
) {
  if (from === to) {
    throw Error('The request object type "from" and "to" must not be the same.')
  }

  return applyDecorators(
    UseInterceptors(new InjectParamsInterceptor(from, to)),
    UsePipes(StripRequestContextPipe)
  );
}
