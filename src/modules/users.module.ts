import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "src/services/users.service";
import { UserController } from "src/controllers/users.controller";
import { User, UserSchema } from "../schemas/users.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        },]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
            }),
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy],
    exports: [UserService]
})

export class UserModule {}