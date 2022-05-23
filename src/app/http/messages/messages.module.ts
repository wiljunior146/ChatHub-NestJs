import { Module } from '@nestjs/common';
import { MessagesService } from '../../services/messages/messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../models/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message])
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
