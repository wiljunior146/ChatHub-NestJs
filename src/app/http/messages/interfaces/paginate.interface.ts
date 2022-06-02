import { ObjectId } from "mongodb";

export interface PaginateMessagesInterface {
  skip: number;
  limit: number;
  roomId: ObjectId;
}
