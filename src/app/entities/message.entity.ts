import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { MessageInterface } from './interfaces/message.interface';
import { User } from 'src/app/entities/user.entity';
import { ObjectID } from 'mongodb';

@Entity({ name: 'messages' })
export class Message implements MessageInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  content: string;

  @Column()
  userId: ObjectID;

  @ManyToOne(() => User, (user) => user.messages)
  user: User

  @Column()
  roomId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
