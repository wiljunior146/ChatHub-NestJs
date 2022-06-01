import { ObjectId } from "mongodb";

export interface PaginateInvitationsInterface {
  page: number;
  limit: number;
  userId?: ObjectId;
  invitedUserId?: ObjectId;
}
