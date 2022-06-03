import { PickType } from '@nestjs/mapped-types';
import { CreateMessageRequestDto } from './create-message-request.dto';

export class UpdateMessageRequestDto extends PickType(
  CreateMessageRequestDto,
  ['content'] as const
) {}
