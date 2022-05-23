import {
  Entity,
  OneToMany,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ContactInterface } from './interfaces/contact.interface';
import { Message } from 'src/app/models/message.entity';
import { User } from 'src/app/models/user.entity';

@Entity({ name: 'contacts' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  _id: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToOne(() => User, (user) => user.contactables)
  contactable: User;

  @OneToMany(() => Message, (message) => message.contact)
  messages: Message[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
