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
  ) : Promise<{ data: Contact[], meta: object }> {
    const take: number = payload.limit;
    const skip: number = (payload.page - 1) * take;

    const [data, total] = await this.contactsRepository.findAndCount({
      where: { userId: payload.userId },
      skip,
      take
    });

    return { data, meta: {
      total: total,
      page: payload.page,
      limit: payload.limit
    }};
  }
}
