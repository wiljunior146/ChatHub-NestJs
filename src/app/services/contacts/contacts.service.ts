import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findOneOrFail(id: string): Promise<Contact> {
    return await this.contactsRepository.findOneOrFail(id);
  }

  async count(payload: object): Promise<number> {
    return await this.contactsRepository.count(payload);
  }
}
