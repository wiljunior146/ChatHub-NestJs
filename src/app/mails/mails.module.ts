import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailsService } from './mails.service';
import appConfig from 'src/config/app';
import mailConfig from 'src/config/mail';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      load: [appConfig, mailConfig]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('mail.host'),
          secure: false,
          auth: {
            user: config.get<string>('mail.username'),
            pass: config.get<string>('mail.password'),
          },
        },
        defaults: {
          from: config.get<string>('mail.from.name') + ' ' + config.get<string>('mail.from.address')
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [MailsService],
  exports: [MailsService]
})

export class MailsModule {}
