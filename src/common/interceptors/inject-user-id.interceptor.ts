import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT } from '../constants/request.constant';
import { Request } from '../enums/request.enum';

/**
 * Injecting user Id to a DTO with the specified request type.
 * 
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 */
@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  /**
     * Construct a new interceptor instance.
     * 
     * @note   This will be used for validation that only needs the user Id like user unique.
     * @param  {Request.Query | Request.Body | Request.Params}  to
     *         Type of request that will received the property.
     * @return {void}
     */
  constructor(private to: Request.Query | Request.Body | Request.Params) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (this.to && request[this.to]) {
      request[this.to][REQUEST_CONTEXT] = request.user.id;
    }

    return next.handle();
  }
}
