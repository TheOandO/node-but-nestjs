import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "src/services/users.service";
import { UserController } from "src/controllers/users.controller";
import { User, UserSchema } from "../schemas/users.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth.module";
import { MailModule } from "./mail.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        },]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES },
            }),
        forwardRef(() => AuthModule),
        MailModule
    ],
    controllers: [UserController],
    providers: [UserService, LocalStrategy],
    exports: [UserService]
})

export class UserModule {}