import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from 'src/common/constants/app.constant';

/**
 * This will attach roles to the route handlers to be used by roles guard.
 * 
 * @note   This decorator is equivalent to @SetMetadata('roles', ['<Role>']).
 *         This decorator must be present if we are gonna use roles guard.
 * @see    https://docs.nestjs.com/guards
 * @return {void}
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
