import { Role } from 'src/app/common/enums/role.enum';
import { Message } from 'src/app/models/message.entity';
import { Contact } from 'src/app/models/contact.entity';

export interface UserInterface {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  messages: Message[];
  contacts: Contact[];
  contactables: Contact[];
}
