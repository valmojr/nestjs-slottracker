import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';
import { DiscordStrategy } from './util/discord.strategy';
import { SessionSerializer } from './util/SessionSerializer.middleware';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    DiscordStrategy,
    UserService,
    DatabaseService,
    SessionSerializer,
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
