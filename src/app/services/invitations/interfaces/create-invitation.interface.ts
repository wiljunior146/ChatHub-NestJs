import { ObjectId } from "mongodb";

export interface CreateInvitationInterface {
  userId: ObjectId,
  invitedUserId: ObjectId
}
