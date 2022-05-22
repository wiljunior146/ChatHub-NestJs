import { User } from "src/models/users/entities/user.entity";
import { Contact } from "src/models/contacts/entities/contact.entity";

export interface MessageInterface {
  _id: string;
  content: string;
  sender: User;
  contact: Contact;
  created_at: Date;
  updated_at: Date;
}
