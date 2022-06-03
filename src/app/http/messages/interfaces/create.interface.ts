import { ObjectId } from "mongodb";

export interface CreateMessageInterface {
  content: string;
  senderId: ObjectId;
  roomId: ObjectId;
}
