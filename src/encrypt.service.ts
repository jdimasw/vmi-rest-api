import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
    hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    checkPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}
