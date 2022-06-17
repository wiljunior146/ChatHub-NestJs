import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { StripRequestContextPipe } from '../pipes/strip-request-context.pipe';
import { InjectParamInterceptor } from '../interceptors/inject-param.interceptor';
import { Request } from '../enums/request.enum';

/**
 * This will inject param property to DTO with @Query decorator.
 */
export function InjectParamToQuery(property: string) {
  return applyDecorators(InjectParam(property, Request.Query));
}

/**
 * This will inject param property to DTO with @Body decorator.
 */
export function InjectParamToBody(property: string) {
  return applyDecorators(InjectParam(property, Request.Body));
}

/**
 * This will inject specific param request property to query or body request
 * to be use on custom class validator and stripe the property after.
 *
 * @note In order to use the injected property the REQUEST_CONTEXT
 *       must be defined on the specific DTO since it will be striped if
 *       the whitelist is true.
 * @see  https://docs.nestjs.com/techniques/validation#stripping-properties
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectParam(
  property: string,
  request: Request.Query | Request.Body,
) {
  return applyDecorators(
    UseInterceptors(new InjectParamInterceptor(property, request)),
    UsePipes(StripRequestContextPipe)
  );
}
