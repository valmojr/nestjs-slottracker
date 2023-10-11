import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [GuildController],
  providers: [DatabaseService, GuildService],
})
export class GuildModule {}
