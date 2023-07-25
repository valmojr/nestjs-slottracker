import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './util/discord.strategy';
import { Oauth2CredentialModule } from './oauth2-credential/oauth2-credential.module';
import { SessionModule } from './session/session.module';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy, UserService, DatabaseService],
  imports: [Oauth2CredentialModule, SessionModule],
})
export class AuthModule {}
