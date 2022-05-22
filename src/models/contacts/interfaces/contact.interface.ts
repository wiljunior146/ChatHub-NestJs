import { User } from 'src/models/users/entities/user.entity';

export interface ContactInterface {
  _id: string;
  user: User;
  contactable: User;
  created_at: Date;
  updated_at: Date;
}
