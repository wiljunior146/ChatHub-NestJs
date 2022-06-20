import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async create(@Body() createInvitationDto: CreateInvitationDto) {
    return await this.invitationsService.create(createInvitationDto);
  }

  @Get()
  async findAll() {
    return await this.invitationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invitationsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return await this.invitationsService.update(+id, updateInvitationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.invitationsService.remove(+id);
  }
}
