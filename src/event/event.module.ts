import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [EventController],
  providers: [DatabaseService, EventService],
})
export class EventModule {}
