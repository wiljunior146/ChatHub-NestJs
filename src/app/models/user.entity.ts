import {
  Entity,
  Column,
  OneToMany,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from 'src/app/common/enums/role.enum';
import { Message } from 'src/app/models/message.entity';
import { Contact } from 'src/app/models/contact.entity';
import { UserInterface } from './interfaces/user.interface';
import { ObjectId } from 'mongodb';

@Entity({ name: 'users' })
export class User implements UserInterface {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Contact, (contact) => contact.contactable)
  contactables: Contact[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
