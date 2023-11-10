import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/services/users.service";
import { UserDocument } from "src/schemas/users.schema";
import * as bcrypt from "bcrypt";
import { AuthPayload } from "src/interfaces/auth-payload.interface";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
            private readonly jwtService: JwtService,
            private readonly userService: UserService,
            private readonly config: ConfigService, 
    ) {}

    /**
     * Compare input password with the hashed one
     * @param {Object} password 
     * @param {Object} storePasswordHash 
     * @returns bcrypt
     */
    async comparePassword(
        password: string,
        storePasswordHash: string,
    ): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }

    /**
     * Authenticate user
     * @param {Object} username 
     * @param {Object} password 
     * @returns {Object} user
     */
    async authentication(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const check = await this.comparePassword(password, user.password);

        if (!user || !check) {
        return false;
        }

        return user;
    }

    /**
     * Generate JWT token
     * @param {Object} user 
     * @returns {Object} token
     */
    async login(user: UserDocument) {
        const payload: AuthPayload = {
            username: user.username,
            id: user.id,
        };

        return { access_token: this.jwtService.sign(payload, {
            secret: this.config.get<string>('JWT_SECRET'),
        })};
    }
}