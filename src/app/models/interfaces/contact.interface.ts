import { ObjectId } from 'mongodb';
import { User } from 'src/app/models/user.entity';

export interface ContactInterface {
  _id?: ObjectId;
  user?: User;
  userId?: ObjectId;
  contactable?: User;
  contactableId?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
