import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { ContactInterface } from 'src/app/entities/interfaces/contact.interface';
import { User } from 'src/app/entities/user.entity';
import { MongoRepository } from 'typeorm';
import { Contact } from '../../entities/contact.entity';
import { PaginateContactsInterface } from './interfaces/paginate.interface';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: MongoRepository<Contact>,
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>
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
   */
  async show(user: User, id: string | ObjectID): Promise<Contact> {
    const contact = await this.contactsRepository.findOneOrFail(id);

    if (! contact.userId.equals(user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const contactable = await this.usersRepository.findOne(contact.contactableId);

    return {...contact, contactable};
  }

  /**
   * Create contact between the inviter and the invited user.
   */
  async create(inviter: User, user: User): Promise<void> {
    const roomId = new ObjectID();
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
