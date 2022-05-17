import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { InjectUserInterceptor } from 'src/common/interceptors/inject.user.interceptor';
import { StripRequestContextPipe } from 'src/common/pipes/strip.request.context.pipe';

/**
 * @note This will inject current user object to @Query decorator.
 */
export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo('query'));
}

/**
 * @note This will inject current user object to @Body decorator.
 */
export function InjectUserToBody() {
  return applyDecorators(InjectUserTo('body'));
}

/**
 * @note This will inject current user object to @Params decorator.
 */
export function InjectUserToParam() {
  return applyDecorators(InjectUserTo('params'));
}

/**
 * Injecting request object to a custom validation class.
 *
 * @see https://github.com/AvantaR/nestjs-validation-tips
 */
export function InjectUserTo(context: 'query' | 'body' | 'params') {
  return applyDecorators(
    UseInterceptors(new InjectUserInterceptor(context)),
    UsePipes(StripRequestContextPipe),
  );
}
