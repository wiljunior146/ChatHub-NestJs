import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/app/models/invitation.entity';
import { DeleteResult, MongoRepository } from 'typeorm';
import { CreateInvitationInterface } from './interfaces/create-invitation.interface';
import { PaginateInvitationsInterface } from './interfaces/paginate-invitations.interface';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: MongoRepository<Invitation>
  ) {}

  async paginate(payload: PaginateInvitationsInterface) {
    const { page, limit, ...match } = payload;
    const skip: number = (page - 1) * limit;
    const userLookup = {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
    };
    const invitedUserLookup = {
      from: 'users',
      localField: 'invitedUserId',
      foreignField: '_id',
      as: 'invitedUser',
    };
    const lookup = payload.invitedUserId
      ? userLookup
      : invitedUserLookup;

    const messages = await this.invitationsRepository
      .aggregate([
        { $match: match },
        { $lookup: lookup },
        { $unwind: payload.invitedUserId ? '$user' : '$invitedUser' }
      ])
      .limit(limit)
      .skip(skip)
      .toArray();
    const total = await this.invitationsRepository.count(match);

    return {
      data: messages,
      meta: { total, page, limit }
    };
  }

  async create(payload: CreateInvitationInterface): Promise<Invitation> {
    return await this.invitationsRepository.save(payload);
  }

  async count(payload: object): Promise<number> {
    return await this.invitationsRepository.count(payload);
  }

  async findOneOrFail(findOptions: any): Promise<Invitation> {
    return await this.invitationsRepository.findOneOrFail(findOptions);
  }

  async delete(criteria: any): Promise<DeleteResult> {
    return await this.invitationsRepository.delete(criteria);
  }
}
