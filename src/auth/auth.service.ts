import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EncryptService } from '../encrypt.service';

@Injectable()
export class AuthService {
    constructor(
        private encryptService: EncryptService,
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);

        if (user && this.encryptService.checkPassword(pass, user.password)) {
            const { id, password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        console.log("login", user)
        const payload = user;
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    // async isAdmin(user: any) {
    //     return user && user.role == 'admin' ? true : false;
    // }
}
