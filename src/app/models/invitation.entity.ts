import {
    Entity,
    OneToMany,
    ManyToOne,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { ContactInterface } from './interfaces/contact.interface';
  import { Message } from 'src/app/models/message.entity';
  import { User } from 'src/app/models/user.entity';
  import { ObjectId } from 'mongodb';
  
  @Entity({ name: 'invitations' })
  export class Contact implements ContactInterface {
    @ObjectIdColumn()
    _id: ObjectId;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  