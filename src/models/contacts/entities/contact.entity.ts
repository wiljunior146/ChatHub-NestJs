import { User } from "src/models/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @ManyToOne(() => User, (user) => user.contactables)
  contactable: User;

  @Column()
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
