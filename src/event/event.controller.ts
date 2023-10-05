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
import { EventService } from './event.service';
import { Event } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/util/discord.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: Event) {
    return this.eventService.create(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('user/:userid')
  findUserEvents(@Param('userid') userid: string) {
    return this.eventService.findByUserId(userid);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('guildEvents/:userid')
  findGuildEvents(@Param('userid') userid: string) {
    return this.eventService.findAvaliableEvents(userid);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch()
  update(@Body() data: Event) {
    return this.eventService.update(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete()
  remove(@Body() data: Event) {
    return this.eventService.remove(data);
  }
}
