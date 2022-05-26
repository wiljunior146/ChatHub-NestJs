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

  @Column()
  senderId: ObjectId;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User

  @Column()
  roomId: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
