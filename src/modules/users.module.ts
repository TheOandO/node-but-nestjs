import { Module } from "@nestjs/common";
import { UserService } from "src/services/users.service";
import { UserController } from "src/controllers/users.controller";
import { User, UserSchema } from "../schemas/users.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JsonWebTokenStrategy } from "src/strategies/jwt.strategy";
import { LocalStrategy } from "src/strategies/local.strategy";
import { AuthService } from "src/services/auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        },])
    ],
    controllers: [UserController],
    providers: [UserService, JsonWebTokenStrategy, LocalStrategy, AuthService],
    exports: [UserService]
})

export class UserModule {}