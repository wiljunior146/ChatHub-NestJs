import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT } from 'src/common/constants/request.constant';

/**
 * Injecting request object to a custom validation class.
 * 
 * @see https://github.com/AvantaR/nestjs-validation-tips
 *
 * @note The value of the user's Id changed when passing it to custom class validator.
 * So the Id must be parsed to string and parse it to ObjectId on the custom class validator
 * to be able to use it again to match on the database.
 * 
 * This might happen on mongodb only since it only happens
 * if the property is an instance of ObjectId.
 *
 * @class
 */
@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  constructor(private type?: NonNullable<'query' | 'body' | 'params'>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const {_id, ...user} = request.user;

    if (this.type && request[this.type]) {
      request[this.type][REQUEST_CONTEXT] = { user: { _id: _id.toString(), ...user }};
    }

    return next.handle();
  }
}
