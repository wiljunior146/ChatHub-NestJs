import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus
} from "@nestjs/common";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express';

/**
 * This custom exception filter will catch every EntityNotFoundError
 * and return a proper response instead of internal server since
 * by default the http exception doesn't have handler for it.
 * 
 * @note This filter is globally used.
 * @see  useGlobalFilters  src/main.ts
 * @see  https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  public catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof EntityNotFoundError
      ? HttpStatus.NOT_FOUND
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message
      ? exception.message
      : 'Something went wrong!';

    return response
      .status(statusCode)
      .json({ statusCode, message });
  }
}
