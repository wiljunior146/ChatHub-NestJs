import {
  Entity,
  Column,
  OneToMany,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from 'src/app/common/enums/role.enum';
import { Message } from 'src/app/entities/message.entity';
import { Contact } from 'src/app/entities/contact.entity';
import { UserInterface } from './interfaces/user.interface';
import { ObjectID } from 'mongodb';
import { Invitation } from './invitation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User implements UserInterface {
  @ObjectIdColumn()
  _id: ObjectID;

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

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Contact, (contact) => contact.contactable)
  contactables: Contact[];

  @OneToMany(() => Invitation, (invitation) => invitation.user)
  sentInvitations: Invitation[]

  @OneToMany(() => Invitation, (invitation) => invitation.invitedUser)
  receivedInvitations: Invitation[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
