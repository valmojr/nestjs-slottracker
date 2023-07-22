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

  async findAll(): Promise<Event[]> {
    return this.databaseService.event.findMany();
  }

  async findById(id: string): Promise<Event> {
    return this.databaseService.event.findUnique({
      where: { id },
    });
  }

  async update(data: Event): Promise<Event> {
    return this.databaseService.event.update({
      where: { id: data.id },
      data,
    });
  }

  async remove({ id }: Event): Promise<Event> {
    return this.databaseService.event.delete({
      where: { id },
    });
  }
}
