import { ObjectID } from "mongodb";

export interface CreateMessageInterface {
  content: string;
  senderId: ObjectID;
  roomId: ObjectID;
}
