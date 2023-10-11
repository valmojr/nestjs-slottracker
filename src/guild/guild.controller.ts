import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { Guild } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/util/discord.guard';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post()
  create(@Body() data: Guild) {
    return this.guildService.create(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.guildService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guildService.find(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('user/:userid')
  findUserGuilds(@Param('userid') userid: string) {
    return this.guildService.findByUserId(userid);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch()
  update(@Body() data: Guild) {
    return this.guildService.update(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  remove(@Body() data: Guild) {
    return this.guildService.remove(data);
  }
}
