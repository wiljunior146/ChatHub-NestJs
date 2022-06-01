import {
  Entity,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { ContactInterface } from './interfaces/contact.interface';
import { User } from 'src/app/models/user.entity';
import { ObjectId } from 'mongodb';

@Entity({ name: 'contacts' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId?: ObjectId;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @Column()
  contactableId?: ObjectId;

  @ManyToOne(() => User, (user) => user.contactables)
  contactable: User;

  @Column()
  roomId: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
