import {
  Entity,
  Column,
  OneToMany,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { Exclude, Transform } from 'class-transformer';
import { Message } from 'src/models/messages/entities/message.entity';
import { Contact } from 'src/models/contacts/entities/contact.entity';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[]

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[]

  @OneToMany(() => Contact, (contact) => contact.contactable)
  contactables: Contact[]

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
