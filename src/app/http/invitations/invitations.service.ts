import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { ObjectId } from 'mongodb';
import { InvitationType } from 'src/app/common/enums/invitation-type.enum';
import { Invitation } from 'src/app/models/invitation.entity';
import { User } from 'src/app/models/user.entity';
import { MongoRepository } from 'typeorm';
import { ContactsService } from '../contacts/contacts.service';
import { PaginateInvitationsInterface } from './interfaces/paginate-invitations.interface';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: MongoRepository<Invitation>,
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
    @InjectQueue('invitation')
    private invitationQueue: Queue,
    private contactsService: ContactsService
  ) {}

  async paginate(
    payload: PaginateInvitationsInterface
  ): Promise<{ data: Invitation[], meta: object }> {

    const { page, limit, type, userId } = payload;
    const skip: number = (page - 1) * limit;
    const isSent: boolean = type == InvitationType.Sent;

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

    const lookup = isSent ? invitedUserLookup : userLookup;
    const match = { [isSent ? 'userId' : 'invitedUserId']: userId };

    const messages = await this.invitationsRepository
      .aggregate([
        { $match: match },
        { $lookup: lookup },
        { $unwind: isSent ? '$invitedUser' : '$user' }
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

  async create(user: User, invitedUserId: string): Promise<Invitation> {
    const invitation = await this.invitationsRepository.save({
      userId: user._id,
      invitedUserId: new ObjectId(invitedUserId)
    });
    const invitedUser = await this.usersRepository.findOneOrFail(invitedUserId);
    
    this.invitationQueue.add('send-invitation-mail', {
      user: invitedUser,
      inviter: user
    });

    return invitation;
  }

  async accept(user: User, findOptions: any): Promise<Invitation> {
    const invitation = await this.invitationsRepository.findOneOrFail(findOptions);

    if (! invitation.invitedUserId.equals(user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.invitationsRepository.delete(findOptions);
    const invitationUserId: any = invitation.userId;
    const inviter = await this.usersRepository.findOneOrFail(invitationUserId);
    await this.contactsService.create(inviter, user);

    this.invitationQueue.add('send-accepted-invitation-mail', { user, inviter });

    return invitation;
  }
}
