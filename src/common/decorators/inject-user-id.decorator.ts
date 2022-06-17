import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { InjectUserIdInterceptor } from '../interceptors/inject-user-id.interceptor';
import { StripRequestContextPipe } from '../pipes/strip-request-context.pipe';
import { Request } from '../enums/request.enum';

/**
 * This will inject current user Id to DTO with @Query decorator.
 */
export function InjectUserIdToQuery() {
  return applyDecorators(InjectUserIdTo(Request.Query));
}

/**
 * This will inject current user Id to DTO with @Body decorator.
 */
export function InjectUserIdToBody() {
  return applyDecorators(InjectUserIdTo(Request.Body));
}

/**
 * This will inject current user Id to DTO with @Param decorator.
 */
export function InjectUserIdToParam() {
  return applyDecorators(InjectUserIdTo(Request.Params));
}

/**
 * Injecting current user Id to a specified request type to be
 * able to use on custom class validator and stripe the user Id after.
 *
 * @note In order to use the injected property the REQUEST_CONTEXT
 *       must be defined on the specific DTO since it will be striped if
 *       the whitelist is true.
 * @see  https://docs.nestjs.com/techniques/validation#stripping-properties
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectUserIdTo(request: Request.Query | Request.Body | Request.Params) {
  return applyDecorators(
    UseInterceptors(new InjectUserIdInterceptor(request)),
    UsePipes(StripRequestContextPipe)
  );
}
