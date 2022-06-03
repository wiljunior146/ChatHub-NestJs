import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { page, limit, userId } = payload;
    const skip: number = (page - 1) * limit;

    const contacts: Contact[] = await this.contactsRepository.aggregate([
        { $match: { userId }},
        { $lookup: {
          from: 'users',
          localField: 'contactableId',
          foreignField: '_id',
          as: 'contactable',
        }},
        { $unwind: '$contactable' }
      ])
      .skip(skip)
      .limit(limit)
      .toArray();
    const total: number = await this.contactsRepository.count({ userId });

    return {
      data: contacts,
      meta: { total, limit, page }
    };
  }

  /**
   * Display the specified resource.
   * 
   * @note Must not use specific type on parameter findOptions
   *       like "findOptions: string | ObjectId" so we can still passed ObjectId
   *       since ObjectID and ObjectId is not the same type.
   */
  async show(user: User, findOptions: any): Promise<Contact> {
    const contact = await this.contactsRepository.findOneOrFail(findOptions);

    if (! contact.userId.equals(user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return contact;
  }

  /**
   * Create contact between the inviter and the invited user.
   */
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
