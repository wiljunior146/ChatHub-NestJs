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
   * Injecting property to a DTO on the specified request type.
   * 
   * @see  https://github.com/AvantaR/nestjs-validation-tips
   */
  @Injectable()
  export class InjectRequestInterceptor implements NestInterceptor {
    /**
     * Construct a new interceptor instance.
     * 
     * @param  {Request.Query | Request.Body | Request.Params}  from
     *         Type of request that the property comes from.
     * @param  {Request.Query | Request.Body | Request.Params}  to
     *         Type of request that will received the property.
     * @param  {string}  property
     *         Property name from the `from` request to be passed to `to` request.
     *         Without property the whole specifc type request object will
     *         be the value for REQUEST_CONTEXT.
     */
    constructor(
      private from: Request.Query | Request.Body | Request.Params,
      private to: Request.Query | Request.Body | Request.Params,
      private property?: string
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
  
      if (this.from && request[this.from] && request[this.to]) {
        const fromRequest = request[this.from];
        const value = this.property && fromRequest[this.property]
          ? fromRequest[this.property]
          : fromRequest;
        request[this.to][REQUEST_CONTEXT] = value;
      }
  
      return next.handle();
    }
  }
  