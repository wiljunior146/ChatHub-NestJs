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
import { ObjectId } from 'mongodb';

@Entity({ name: 'contacts' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  _id: ObjectId;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToOne(() => User, (user) => user.contactables)
  contactable: User;

  @OneToMany(() => Message, (message) => message.contact)
  messages: Message[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
