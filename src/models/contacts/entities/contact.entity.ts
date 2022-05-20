import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ContactInterface } from '../interfaces/contact.interface';
import { Exclude, Transform } from 'class-transformer';
import { User } from 'src/models/users/entities/user.entity';

@Entity({ name: 'messages' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString())
  _id: string;

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
}
