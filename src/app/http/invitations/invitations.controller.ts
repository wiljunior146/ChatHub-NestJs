import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { InjectUserToBody } from 'src/app/common/decorators/inject.user.decorator';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { Role } from 'src/app/common/enums/role.enum';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { InvitationsService } from 'src/app/http/invitations/invitations.service';
import { CreateInvitationRequestDto } from './requests/create-invitation-request.dto';
import { GetInvitationsRequestDto } from './requests/get-invitations-request.dto';
import { InvitationResourceDto } from './resources/invitation-resource.dto';

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(
    @Query() query: GetInvitationsRequestDto,
    @Request() req
  ) {
    const payload = { ...query, userId: req.user._id };
    const { data, meta} = await this.invitationsService.paginate(payload);
    return {
      data: data.map((message) => new InvitationResourceDto(message)),
      meta
    };
  }

  @Post()
  @InjectUserToBody()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() body: CreateInvitationRequestDto,
    @Request() req
  ) {
    const invitation = await this.invitationsService.create(
      req.user,
      body.invitedUserId
    );
    return new InvitationResourceDto(invitation);
  }

  @Put('accept/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async accept(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.accept(req.user, id);
    return new InvitationResourceDto(invitation);
  }

  @Delete('decline/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async decline(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.decline(req.user, id);
    return new InvitationResourceDto(invitation);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async destroy(
    @Param('id') id: string,
    @Request() req
  ) {
    const invitation = await this.invitationsService.cancel(req.user, id);
    return new InvitationResourceDto(invitation);
  }
}
