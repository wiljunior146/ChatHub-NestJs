import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from 'src/common/constants/app.constant';

/**
 * This will attach custom metadata to route handlers.
 * 
 * @note   This decorator is equivalent to @SetMetadata('roles', ['sample-role']).
 * @see    https://docs.nestjs.com/guards
 * @return void
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
