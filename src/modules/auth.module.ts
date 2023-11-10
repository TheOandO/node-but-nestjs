import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from '../modules/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UserService } from 'src/services/users.service';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, UserService, LocalStrategy, JsonWebTokenStrategy],
    controllers: [AuthController],
})

export class AuthModule {}
