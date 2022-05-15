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

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString())
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Message, (message) => message.sender)
  sent_messages: Message[]

  @OneToMany(() => Message, (message) => message.receiver)
  recieved_messages: Message[]

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
