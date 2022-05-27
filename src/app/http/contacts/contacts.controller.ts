import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { ContactsService } from 'src/app/services/contacts/contacts.service';
import { GetContactsDto } from './dto/get-contacts.dto';
import { ContactResource } from './resources/contact.resource';

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
    @Query() query: GetContactsDto,
    @Request() req
  ): Promise<{ data: ContactResource[], meta: object }> {
    const { data, meta } = await this.contactsService.paginate({
      userId: req.user._id,
      ...query
    });

    return {
      data: data.map((contact) => new ContactResource(contact)),
      meta
    };
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string, @Request() req) {
    const contact = await this.contactsService.findOneOrFail(id);

    if (! contact.userId.equals(req.user._id)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return new ContactResource(contact);
  }
}
