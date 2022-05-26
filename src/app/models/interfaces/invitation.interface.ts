import { ObjectId } from 'mongodb';

export interface ContactInterface {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
