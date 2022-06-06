import {
  Entity,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { InvitationInterface } from './interfaces/invitation.interface';
import { User } from 'src/app/entities/user.entity';
import { ObjectID } from 'mongodb';

@Entity({ name: 'invitations' })
export class Invitation implements InvitationInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId: ObjectID;

  @ManyToOne(() => User, (user) => user.sentInvitations)
  user: User

  @Column()
  invitedUserId: ObjectID;

  @ManyToOne(() => User, (user) => user.receivedInvitations)
  invitedUser: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
