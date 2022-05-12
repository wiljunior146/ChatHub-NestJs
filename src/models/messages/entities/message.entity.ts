import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { MessageInterface } from '../interfaces/message.interface';
import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/models/users/entities/user.entity';

@Entity({ name: 'messages' })
export class Message implements MessageInterface {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString())
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.sent_messages)
  sender: User

  @ManyToOne(() => User, (user) => user.recieved_messages)
  receiver: User

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}
