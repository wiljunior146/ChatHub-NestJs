import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { MetaResponseDto } from "../responses/meta-response.dto";
import { PaginatedResponseDto } from "../responses/paginated-response.dto";

/**
 * Decorator for Advanced: Generic ApiResponse.
 * 
 * @see https://docs.nestjs.com/openapi/operations#advanced-generic-apiresponse
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  meta: object = {}
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              },
              meta: {
                type: 'object',
                properties: {
                  limit: { type: 'number' },
                  page: { type: 'number' },
                  total: { type: 'number' },
                  ...meta
                }
              }
            }
          }
        ]
      }
    })
  );
};
