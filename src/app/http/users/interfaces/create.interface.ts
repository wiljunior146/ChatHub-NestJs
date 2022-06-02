import { Role } from "src/app/common/enums/role.enum";

export interface CreateUserInterface {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
}
