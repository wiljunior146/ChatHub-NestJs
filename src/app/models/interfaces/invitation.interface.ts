import { ObjectId } from 'mongodb';
import { User } from '../user.entity';

export interface InvitationInterface {
  _id?: ObjectId;
  userId?: ObjectId;
  user?: User;
  invitedUserId?: ObjectId;
  invitedUser?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
