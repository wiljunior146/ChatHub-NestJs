import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ContactInterface } from 'src/app/models/interfaces/contact.interface';
import { User } from 'src/app/models/user.entity';
import { MongoRepository } from 'typeorm';
import { Contact } from '../../models/contact.entity';
import { PaginateContactsInterface } from './interfaces/paginate.interface';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: MongoRepository<Contact>
  ) {}

  async paginate(
    payload: PaginateContactsInterface
  ): Promise<{ data: Contact[], meta: object }> {
    const limit: number = payload.limit;
    const skip: number = (payload.page - 1) * limit;

    const contacts: Contact[] = await this.contactsRepository.aggregate([
        { $match: { userId: payload.userId }},
        {
          $lookup: {
            from: 'users',
            localField: 'contactableId',
            foreignField: '_id',
            as: 'contactable',
          }
        },
        { $unwind: '$contactable' }
      ])
      .skip(skip)
      .limit(limit)
      .toArray();
    const total: number = await this.contactsRepository.count({ userId: payload.userId });

    return {
      data: contacts,
      meta: {
        total,
        limit,
        page: payload.page
      }
    };
  }

  async findOneOrFail(findOptions: any): Promise<Contact> {
    return await this.contactsRepository.findOneOrFail(findOptions);
  }

  async count(payload: object): Promise<number> {
    return await this.contactsRepository.count(payload);
  }

  async create(inviter: User, user: User): Promise<void> {
    const roomId = new ObjectId();
    let contacts: ContactInterface[] = [
      {
        userId: inviter._id,
        contactableId: user._id,
        roomId,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        userId: user._id,
        contactableId: inviter._id,
        roomId,
        createdAt: new Date,
        updatedAt: new Date
      }
    ];
    await this.contactsRepository.insertMany(contacts);
  } 
}
