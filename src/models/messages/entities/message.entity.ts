import {
  Entity,
  Column,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { MessageInterface } from '../interfaces/message.interface';
import { Transform } from 'class-transformer';
import { User } from 'src/models/users/entities/user.entity';
import { Contact } from "src/models/contacts/entities/contact.entity";

@Entity({ name: 'messages' })
export class Message implements MessageInterface {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User

  @ManyToOne(() => Contact, (contact) => contact.messages)
  contact: Contact

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}
