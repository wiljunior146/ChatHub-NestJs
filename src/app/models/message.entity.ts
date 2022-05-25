import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { MessageInterface } from './interfaces/message.interface';
import { User } from 'src/app/models/user.entity';
import { Contact } from "src/app/models/contact.entity";
import { ObjectId } from 'mongodb';

@Entity({ name: 'messages' })
export class Message implements MessageInterface {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User

  @ManyToOne(() => Contact, (contact) => contact.messages)
  contact: Contact

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
