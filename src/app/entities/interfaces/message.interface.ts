import { User } from "src/app/entities/user.entity";
import { ObjectID } from "mongodb";

export interface MessageInterface {
  _id?: ObjectID;
  content?: string;
  userId?: ObjectID;
  user?: User;
  roomId?: ObjectID;
  createdAt?: Date;
  updatedAt?: Date;
}
