import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
        usernameField: 'username',
        });
    }

    async validate(username: string, password: string) {
        const user = await this.authService.authentication(username, password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return user;
    }
}
