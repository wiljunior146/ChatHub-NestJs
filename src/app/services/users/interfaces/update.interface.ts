import { Role } from "src/app/common/enums/role.enum";

export interface UpdateUserInterface {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}
