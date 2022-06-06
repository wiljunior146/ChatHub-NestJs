import { ObjectID } from 'mongodb';
import { User } from '../user.entity';

export interface InvitationInterface {
  _id?: ObjectID;
  userId?: ObjectID;
  user?: User;
  invitedUserId?: ObjectID;
  invitedUser?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
