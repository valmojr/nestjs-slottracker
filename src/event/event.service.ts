import { Injectable } from '@nestjs/common';
import { Event, Group, Role } from '@prisma/client';
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

  async find(eventOrEventId: Event | string): Promise<Event> {
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

  async findByUserId(userid: string): Promise<Event[]> {
    const fetchedRoles: Role[] = await this.databaseService.role.findMany({
      where: {
        assignedUser: { id: userid },
      },
    });

    const groups: Group[] = await this.databaseService.group.findMany({
      where: {
        roles: {
          some: {
            id: { in: fetchedRoles.map((fetchedRole) => fetchedRole.id) },
          },
        },
      },
    });

    const events: Event[] = await this.databaseService.event.findMany({
      where: {
        groups: {
          some: { id: { in: groups.map((group) => group.id) } },
        },
      },
    });

    return events;
  }

  update(data: Event): Promise<Event> {
    return this.databaseService.event.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async remove(eventOrEventId: Event | string): Promise<Event> {
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
