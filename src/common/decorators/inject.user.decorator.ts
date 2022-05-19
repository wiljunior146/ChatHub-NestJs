import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { InjectUserInterceptor } from 'src/common/interceptors/inject.user.interceptor';
import { StripRequestContextPipe } from 'src/common/pipes/strip.request.context.pipe';

/**
 * This will inject current user object to dto with @Query decorator.
 * 
 * @return {void}
 */
export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo('query'));
}

/**
 * This will inject current user object to dto with @Body decorator.
 * 
 * @return {void}
 */
export function InjectUserToBody() {
  return applyDecorators(InjectUserTo('body'));
}

/**
 * This will inject current user object to dto with @Params decorator.
 * 
 * @return {void}
 */
export function InjectUserToParam() {
  return applyDecorators(InjectUserTo('params'));
}

/**
 * Injecting request object to a specified context to be able to use on custom class validator.
 *
 * @see https://github.com/AvantaR/nestjs-validation-tips
 *
 * @param  {'query' | 'body' | 'params'}  context
 * @return {void}
 */
export function InjectUserTo(context: 'query' | 'body' | 'params') {
  return applyDecorators(
    UseInterceptors(new InjectUserInterceptor(context)),
    UsePipes(StripRequestContextPipe),
  );
}
