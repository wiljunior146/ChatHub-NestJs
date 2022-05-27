import { User } from "src/app/models/user.entity";
import { ObjectId } from "mongodb";

export interface MessageInterface {
  _id?: ObjectId;
  content?: string;
  userId?: ObjectId;
  user?: User;
  roomId?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
