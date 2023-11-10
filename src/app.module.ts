import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';
import { AuthModule } from './modules/auth.module';
import dotenv from 'dotenv';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
    ),
    UserModule,
    TodoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
