import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserMeController } from './me.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UserController, UserMeController],
  providers: [DatabaseService, UserService, AuthService],
})
export class UserModule {}
