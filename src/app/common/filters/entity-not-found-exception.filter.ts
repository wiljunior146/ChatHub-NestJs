import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus
} from "@nestjs/common";
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express';
import { InvalidObjectIdException } from "src/app/exceptions/invalid-object-id.exception";

/**
 * This custom exception filter will catch every EntityNotFoundError
 * and return a proper response instead of internal server error since
 * nestJs doesn't have handler for TypeORM exceptions.
 * 
 * @note If we want to throw another exception if the entity is not found,
 *       we must not used the TypeORM methods that throws EntityNotFoundError by default.
 *       IE: findOneOrFail
 * 
 *       Like in authorization, we don't throw entity not found instead we throw unauthorized.
 * 
 * @note bson package that used by MongoDB version 3 throws the generic Error unlike the bson
 *       package that version 4 used that throws a BSONTypeError exception.
 *
 *       Since catching the generic Error will catch everything including request exceptions,
 *       we will create a new exception to throw if the id is not a valid ObjectID
 *       but we need to do it manually.
 *       IE: if (! ObjectID.isValid(id)) throw new InvalidObjectIdException();
 * 
 * @see  src/app/exceptions/invalid-object-id.exception.ts
 * @see  https://docs.nestjs.com/exception-filters
 *       TypeOrm does not yet supported mongoDB version 4.
 * @see  https://github.com/typeorm/typeorm - Installation Section.
 */
@Catch(EntityNotFoundError, InvalidObjectIdException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  public catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.NOT_FOUND;

    return response
      .status(statusCode)
      .json({ statusCode, message });
  }
}
