import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './util/discord.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy],
})
export class AuthModule {}
