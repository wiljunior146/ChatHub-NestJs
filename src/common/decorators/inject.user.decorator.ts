import { applyDecorators, Req, UseInterceptors, UsePipes } from '@nestjs/common';
import { InjectUserInterceptor } from 'src/common/interceptors/inject.user.interceptor';
import { StripRequestContextPipe } from 'src/common/pipes/strip.request.context.pipe';
import { Request } from 'src/common/enums/request.enum';

/**
 * This will inject current user object to dto that uses @Query decorator.
 */
export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo(Request.Query));
}

/**
 * This will inject current user object to dto that uses @Body decorator.
 */
export function InjectUserToBody() {
  return applyDecorators(InjectUserTo(Request.Body));
}

/**
 * This will inject current user object to dto that uses @Param decorator.
 */
export function InjectUserToParam() {
  return applyDecorators(InjectUserTo(Request.Params));
}

/**
 * Injecting current user object to a specified context to be able to use on custom class validator.
 *
 * @see https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectUserTo(context: Request.Query | Request.Body | Request.Params) {
  return applyDecorators(
    UseInterceptors(new InjectUserInterceptor(context)),
    UsePipes(StripRequestContextPipe)
  );
}
