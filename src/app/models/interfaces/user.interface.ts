import { Role } from 'src/app/common/enums/role.enum';
import { Message } from 'src/app/models/message.entity';
import { Contact } from 'src/app/models/contact.entity';
import { ObjectId } from 'mongodb';

export interface UserInterface {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: Message[];
  contacts?: Contact[];
  contactables?: Contact[];
}
