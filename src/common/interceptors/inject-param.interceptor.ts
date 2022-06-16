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
   * Injecting a param property to a DTO on the specified request type.
   * 
   * @see  https://github.com/AvantaR/nestjs-validation-tips
   */
  @Injectable()
  export class InjectParamInterceptor implements NestInterceptor {
    /**
     * Construct a new interceptor instance.
     * 
     * @param  property
     * Property from Param request to be passed to the specified request type.
     * @param  request
     * Type of the request that will received the property.
     */
    constructor(
      private property: string,
      private request: Request.Query | Request.Body,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const value = request.params[this.property];
  
      request[this.request][REQUEST_CONTEXT] = value;
  
      return next.handle();
    }
  }
  