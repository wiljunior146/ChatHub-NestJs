import { ObjectId } from "mongodb";

export interface PaginateContactsInterface {
  page: number;
  limit: number;
  userId: ObjectId;
}
