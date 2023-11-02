import { Module } from "@nestjs/common";
import { UserService } from "src/services/users.service";
import { UserController } from "src/controllers/users.controller";
import { User, UserSchema } from "../schemas/users.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        },])
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}