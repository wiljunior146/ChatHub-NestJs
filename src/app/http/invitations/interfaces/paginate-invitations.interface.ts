import { ObjectID } from "mongodb";
import { InvitationType } from "src/app/common/enums/invitation-type.enum";

export interface PaginateInvitationsInterface {
  page: number;
  limit: number;
  type: InvitationType;
  userId?: ObjectID;
}
