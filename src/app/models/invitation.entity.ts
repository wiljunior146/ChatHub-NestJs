import {
  Entity,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { InvitationInterface } from './interfaces/invitation.interface';
import { User } from 'src/app/models/user.entity';
import { ObjectId } from 'mongodb';

@Entity({ name: 'invitations' })
export class Invitation implements InvitationInterface {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: ObjectId;

  @ManyToOne(() => User, (user) => user.sentInvitations)
  user: User

  @Column()
  invitedUserId: ObjectId;

  @ManyToOne(() => User, (user) => user.receivedInvitations)
  invitedUser: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
