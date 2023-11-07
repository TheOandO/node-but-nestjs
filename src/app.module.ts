import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://RealKRipper:khanhpro0303@test.ivtlqlf.mongodb.net/',
    ),
    UserModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
