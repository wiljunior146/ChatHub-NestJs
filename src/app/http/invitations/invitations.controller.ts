import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Queue } from 'bull';
import { ObjectId } from 'mongodb';
import { InjectUserToBody } from 'src/app/common/decorators/inject.user.decorator';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { Role } from 'src/app/common/enums/role.enum';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { InvitationsService } from 'src/app/services/invitations/invitations.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationResource } from './resources/invitation.resource';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly usersService: UsersService
  ) {}

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

    return new InvitationResource(invitation);
  }
}
