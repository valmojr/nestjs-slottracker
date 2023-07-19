import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Group } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class GroupService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Group): Promise<Group> {
    data.id = randomUUID();

    return this.databaseService.group.create({
      data,
    });
  }

  findAll(): Promise<Group[]> {
    return this.databaseService.group.findMany();
  }

  findById(id: string) {
    return this.databaseService.group.findMany({
      where: {
        id,
      },
    });
  }

  update(data: Group) {
    return this.databaseService.group.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove({ id }: Group) {
    return this.databaseService.group.delete({
      where: { id },
    });
  }
}
