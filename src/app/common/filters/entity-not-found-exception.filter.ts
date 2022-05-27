import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus
} from "@nestjs/common";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express';
import { BSONTypeError } from 'bson';

/**
 * This custom exception filter will catch every EntityNotFoundError
 * and return a proper response instead of internal server error since
 * nestJs doesn't have handler for TypeORM exceptions.
 * 
 * We will also include BSONTypeError since it throws an internal server error
 * if the passed mongodb Id is an invalid length or format for Object Id so we can assume
 * that it's also not found.
 * 
 * @note If we want to throw another exception if the entity is not found,
 *       we must not used the TypeORM methods that throws EntityNotFoundError by default.
 *       EI: findOneOrFail
 * 
 *       Like in authorization, we don't throw entity not found instead we throw unauthorized.
 * @see  https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError, BSONTypeError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  public catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof EntityNotFoundError || BSONTypeError
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
