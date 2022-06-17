import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { StripRequestContextPipe } from '../pipes/strip-request-context.pipe';
import { Request } from '../enums/request.enum';
import { InjectUserInterceptor } from '../interceptors/inject-user.interceptor';

/**
 * This will inject current user to DTO with @Query decorator.
 */
export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo(Request.Query));
}

/**
 * This will inject current user to DTO with @Body decorator.
 */
export function InjectUserToBody() {
  return applyDecorators(InjectUserTo(Request.Body));
}

/**
 * This will inject current user to DTO with @Param decorator.
 */
export function InjectUserToParam() {
  return applyDecorators(InjectUserTo(Request.Params));
}

/**
 * Injecting current user entity to a specified request type to be
 * able to use on custom class validator and stripe the user entity after.
 *
 * @note In order to use the injected property the REQUEST_CONTEXT
 *       must be defined on the specific DTO since it will be striped if
 *       the whitelist is true.
 * @see  https://docs.nestjs.com/techniques/validation#stripping-properties
 * @see https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectUserTo(request: Request.Query | Request.Body | Request.Params) {
  return applyDecorators(
    UseInterceptors(new InjectUserInterceptor(request)),
    UsePipes(StripRequestContextPipe)
  );
}
