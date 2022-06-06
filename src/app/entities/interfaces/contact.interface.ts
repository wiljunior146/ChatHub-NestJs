import { ObjectID } from 'mongodb';
import { User } from 'src/app/entities/user.entity';

export interface ContactInterface {
  _id?: ObjectID;
  user?: User;
  userId?: ObjectID;
  contactableId?: ObjectID;
  roomId?: ObjectID;
  createdAt?: Date;
  updatedAt?: Date;
}
