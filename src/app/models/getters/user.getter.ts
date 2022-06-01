import { Role } from 'src/app/common/enums/role.enum';

/**
 * Get text equivalent of the specific role.
 * 
 * @param  {object}  property
 * @return {string}
 */
export const roleText = function ({ value }: any): string {
  switch (value) {
    case Role.Admin:
      return 'Admin';
    case Role.Staff:
      return 'Staff';
    case Role.User:
      return 'User';
  }
}
