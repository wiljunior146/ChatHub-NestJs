import { Role } from 'src/app/common/enums/role.enum';
import { Message } from 'src/app/entities/message.entity';
import { Contact } from 'src/app/entities/contact.entity';
import { ObjectID } from 'mongodb';
import { Invitation } from '../invitation.entity';

export interface UserInterface {
  _id?: ObjectID;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  messages?: Message[];
  contacts?: Contact[];
  contactables?: Contact[];
  sentInvitations?: Invitation[];
  receivedInvitations?: Invitation[];
  createdAt?: Date;
  updatedAt?: Date;
}
