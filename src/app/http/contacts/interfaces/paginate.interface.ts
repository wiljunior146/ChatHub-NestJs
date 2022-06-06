import { ObjectID } from "mongodb";

export interface PaginateContactsInterface {
  page: number;
  limit: number;
  userId: ObjectID;
}
