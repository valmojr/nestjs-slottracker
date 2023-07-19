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

  findById(id: string) {
    return this.databaseService.event.findMany({
      where: {
        id,
      },
    });
  }

  update(data: Event) {
    return this.databaseService.event.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove({ id }: Event) {
    return this.databaseService.event.delete({
      where: { id },
    });
  }
}
