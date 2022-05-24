import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT } from 'src/app/common/constants/request.constant';
import { Request } from 'src/app/common/enums/request.enum';

/**
 * Injecting user ID to a DTO on the specified request type.
 * 
 * @see  https://github.com/AvantaR/nestjs-validation-tips
 * @note The value of the user's Id changed when passing it to the custom class validator.
 *       So the Id must be parsed to string and parse it to ObjectId on the custom class validator
 *       to be able to use it again to match on the database.
 * 
 *       This might happen on mongodb only since it only happens
 *       if the property is an instance of ObjectId.
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
