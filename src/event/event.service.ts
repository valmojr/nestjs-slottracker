import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Event): Promise<Event> {
    data.id = randomUUID();

    return this.databaseService.event.create({
      data,
    });
  }

  findAll(): Promise<Event[]> {
    return this.databaseService.event.findMany();
  }

  find(eventOrEventId: Event | string): Promise<Event> {
    if (typeof eventOrEventId == 'string') {
      return this.databaseService.event.findUnique({
        where: {
          id: eventOrEventId,
        },
      });
    } else {
      return this.databaseService.event.findUnique({
        where: {
          id: eventOrEventId.id,
        },
      });
    }
  }

  update(data: Event): Promise<Event> {
    return this.databaseService.event.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove(eventOrEventId: Event | string): Promise<Event> {
    if (typeof eventOrEventId == 'string') {
      return this.databaseService.event.delete({
        where: {
          id: eventOrEventId,
        },
      });
    } else {
      return this.databaseService.event.delete({
        where: {
          id: eventOrEventId.id,
        },
      });
    }
  }
}
