import { Role } from "src/common/enums/role.enum";
import { Contact } from "src/models/contacts/entities/contact.entity";
import { Invitation } from "src/models/invitations/entities/invitation.entity";
import { Message } from "src/models/messages/entities/message.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
  sentInvitations: Invitation[];

  @OneToMany(() => Invitation, (invitation) => invitation.invitedUser)
  receivedInvitations: Invitation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
