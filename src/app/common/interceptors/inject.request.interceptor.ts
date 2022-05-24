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
   * Injecting request object to a custom validation class.
   * 
   * @see  https://github.com/AvantaR/nestjs-validation-tips
   */
  @Injectable()
  export class InjectParamsInterceptor implements NestInterceptor {
    constructor(
      private from?: NonNullable<Request.Query | Request.Body | Request.Params>,
      private to?: NonNullable<Request.Query | Request.Body | Request.Params>
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
  
      if (this.from && request[this.from]) {
        request[this.to][REQUEST_CONTEXT] = request[this.from];
      }
  
      return next.handle();
    }
  }
  