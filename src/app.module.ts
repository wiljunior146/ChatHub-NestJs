import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MessagesModule,
    MongooseModule.forRoot('mongodb+srv://chathub-local:J5MFbNwPtjkW8gW4@chathub.s59sm.mongodb.net/chathub?retryWrites=true&w=majority'),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
