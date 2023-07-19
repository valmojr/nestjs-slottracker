import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: User): Promise<User> {
    data.id = randomUUID();

    return this.databaseService.user.create({
      data,
    });
  }

  findAll(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }

  findById(id: string) {
    return this.databaseService.user.findMany({
      where: {
        id,
      },
    });
  }

  update(data: User) {
    return this.databaseService.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove({ id }: User) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
