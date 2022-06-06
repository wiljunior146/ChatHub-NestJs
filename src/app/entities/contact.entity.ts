import {
  Entity,
  ManyToOne,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm';
import { ContactInterface } from './interfaces/contact.interface';
import { User } from 'src/app/entities/user.entity';
import { ObjectID } from 'mongodb';

@Entity({ name: 'contacts' })
export class Contact implements ContactInterface {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId?: ObjectID;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @Column()
  contactableId?: ObjectID;

  @ManyToOne(() => User, (user) => user.contactables)
  contactable: User;

  @Column()
  roomId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
