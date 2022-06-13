import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';
import { Request } from 'src/common/enums/request.enum';

/**
 * Injecting user ID to a DTO on the specified request type.
 * 
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 */
@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  /**
     * Construct a new interceptor instance.
     * 
     * @note   There will be no need to pass the whole user object
     *         since we only need the Id for the query of the validation.
     *         This will also make our validator reusable since the specific value
     *         will be the REQUEST_CONTEXT itself.
     * @param  {Request.Query | Request.Body | Request.Params}  to
     *         Type of request that will received the property.
     * @return {void}
     */
  constructor(private to: Request.Query | Request.Body | Request.Params) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (this.to && request[this.to]) {
      request[this.to][REQUEST_CONTEXT] = request.user._id.toString();
    }

    return next.handle();
  }
}
