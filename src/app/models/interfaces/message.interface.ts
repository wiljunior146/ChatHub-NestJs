import { User } from "src/app/models/user.entity";
import { Contact } from "src/app/models/contact.entity";

export interface MessageInterface {
  _id: string;
  content: string;
  sender: User;
  contact: Contact;
  created_at: Date;
  updated_at: Date;
}
