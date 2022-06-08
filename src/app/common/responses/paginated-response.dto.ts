export class PaginatedResponseDto<TData, TMeta> {
  meta: TMeta;

  data: TData[];
}
