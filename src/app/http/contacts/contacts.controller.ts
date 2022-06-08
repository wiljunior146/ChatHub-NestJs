import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { Role } from 'src/app/common/enums/role.enum';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/common/guards/roles.guard';
import { InvalidObjectIdException } from 'src/app/exceptions/invalid-object-id.exception';
import { ContactsService } from './contacts.service';
import { GetContactsRequestDto } from './requests/get-contacts-request.dto';
import { ContactResourceDto } from './resources/contact-resource.dto';
import { ObjectID } from  'mongodb';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contacts')
@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(
    @Query() query: GetContactsRequestDto,
    @Request() req
  ) {
    const userId = req.user._id;
    const { data, meta } = await this.contactsService.paginate({ userId, ...query });
    return {
      data: data.map((contact) => new ContactResourceDto(contact)),
      meta
    };
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(
    @Param('id') id: string,
    @Request() req
  ) {
    if (! ObjectID.isValid(id)) throw new InvalidObjectIdException();

    const contact = await this.contactsService.show(req.user, id);
    return new ContactResourceDto(contact);
  }
}
