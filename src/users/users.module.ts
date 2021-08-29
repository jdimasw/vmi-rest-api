import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { EncryptService } from '../encrypt.service';
// import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EncryptService, 
    // AuthService
  ],
  // imports: [AuthModule],
  exports: [UsersService]
})
export class UsersModule {}
