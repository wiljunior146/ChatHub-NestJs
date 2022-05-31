import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/app/models/invitation.entity';
import { MongoRepository } from 'typeorm';
import { CreateInvitationInterface } from './interfaces/create-invitation.interface';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: MongoRepository<Invitation>
  ) {}

  async create(payload: CreateInvitationInterface): Promise<Invitation> {
    return await this.invitationsRepository.save(payload);
  }
}
