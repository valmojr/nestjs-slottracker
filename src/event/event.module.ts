import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [EventController],
  providers: [DatabaseService, EventService], // eu preciso importar o DatabaseService para o módulo do Event para que os services e controllers usem ele
})
export class EventModule {}
