import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { MailModule } from './modules/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule.forRoot({ isGlobal: true })],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
        })
      }),
    forwardRef(() => UserModule) ,
    TodoModule,
    forwardRef(() => AuthModule) ,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"No Reply" <no-reply@gmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}