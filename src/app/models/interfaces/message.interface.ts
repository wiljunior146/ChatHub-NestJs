import { User } from "src/app/models/user.entity";
import { Contact } from "src/app/models/contact.entity";
import { ObjectId } from "mongodb";

export interface MessageInterface {
  _id: ObjectId;
  content: string;
  senderId?: string;
  sender?: User;
  contact?: Contact;
  contactId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
