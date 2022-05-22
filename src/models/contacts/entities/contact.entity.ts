import {
  Entity,
  OneToMany,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ContactInterface } from '../interfaces/contact.interface';
import { Transform } from 'class-transformer';
import { Message } from 'src/models/messages/entities/message.entity';
import { User } from 'src/models/users/entities/user.entity';

@Entity({ name: 'contacts' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString())
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
