import { ObjectID } from "mongodb";

export interface PaginateMessagesInterface {
  skip: number;
  limit: number;
  roomId: ObjectID;
}
