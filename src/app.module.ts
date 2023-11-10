import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
        })
      }),
    forwardRef(() => UserModule) ,
    TodoModule,
    forwardRef(() => AuthModule) ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
