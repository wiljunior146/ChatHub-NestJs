import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, ForbiddenException} from "@nestjs/common";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express';

/**
 * This custom exception filter will catch every unhandled exception
 * and return the proper response for specific error.
 * 
 * @see  https://docs.nestjs.com/exception-filters
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  public catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = this.httpStatus(exception);
    const message = exception.message
      ? exception.message
      : 'Error';

    return response
      .status(statusCode)
      .json({ statusCode, message });
  }

  public httpStatus(exception: any): number {
    switch (exception.constructor) {
      case EntityNotFoundError:
        return HttpStatus.NOT_FOUND;
      case ForbiddenException:
        return HttpStatus.FORBIDDEN;
      case HttpException:
        return exception.getStatus();
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
