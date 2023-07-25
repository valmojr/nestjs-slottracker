import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: Event) {
    return this.eventService.create(data);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @Patch()
  update(@Body() data: Event) {
    return this.eventService.update(data);
  }

  @Delete()
  remove(@Body() data: Event) {
    return this.eventService.remove(data);
  }
}
