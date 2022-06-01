import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Queue } from 'bull';
import { ObjectId } from 'mongodb';
import { InjectUserToBody } from 'src/app/common/decorators/inject.user.decorator';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { InvitationType } from 'src/app/common/enums/invitation-type.enum';
import { Role } from 'src/app/common/enums/role.enum';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { GetInvitationsDto } from './dto/get-invitations.dto';
import { InvitationResource } from './resources/invitation.resource';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly usersService: UsersService,
    private readonly contactsService: ContactsService,
    @InjectQueue('invitation')
    private invitationQueue: Queue
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@Query() query: GetInvitationsDto, @Request() req) {
    const property = query.type == InvitationType.Sent
      ? 'userId'
      : 'invitedUserId';
    const { data, meta} = await this.invitationsService.paginate({
      page: query.page,
      limit: query.limit,
      [property]: req.user._id
    });

    return {
      data: data.map((message) => new InvitationResource(message)),
      meta
    };
  }

  @Post()
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() body: CreateInvitationDto, @Request() req) {
    const payload = {
      userId: req.user._id,
      invitedUserId: new ObjectId(body.invitedUserId)
    };
    const invitation = await this.invitationsService.create(payload);
    const invitedUser = await this.usersService.findOne(body.invitedUserId);

    this.invitationQueue.add('send-invitation-mail', {
      user: invitedUser,
      inviter: req.user
    });

    return new InvitationResource(invitation);
  }

  @Put('accept/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async accept(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.findOneOrFail(id);

    if (! invitation.invitedUserId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.invitationsService.delete(id);
    const inviter = await this.usersService.findOneOrFail(invitation.userId);
    await this.contactsService.create(inviter, req.user);

    this.invitationQueue.add('send-accepted-invitation-mail', {
      user: req.user,
      inviter
    });

    return new InvitationResource(invitation);
  }

  @Delete('decline/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async decline(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.findOneOrFail(id);

    if (! invitation.invitedUserId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.invitationsService.delete(id);
    const inviter = await this.usersService.findOneOrFail(invitation.userId);

    this.invitationQueue.add('send-declined-invitation-mail', {
      user: req.user,
      inviter
    });

    return new InvitationResource(invitation);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.findOneOrFail(id);

    if (! invitation.userId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    await this.invitationsService.delete(id);
    const invitedUser = await this.usersService.findOneOrFail(invitation.invitedUserId);

    this.invitationQueue.add('send-cancelled-invitation-mail', {
      user: invitedUser,
      inviter: req.user
    });

    return new InvitationResource(invitation);
  }
}
