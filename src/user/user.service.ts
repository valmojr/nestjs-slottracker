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

  find(userOrUserId: User | string): Promise<User> {
    if (typeof userOrUserId == 'string') {
      return this.databaseService.user.findUnique({
        where: {
          id: userOrUserId,
        },
      });
    } else {
      return this.databaseService.user.findUnique({
        where: {
          id: userOrUserId.id,
        },
      });
    }
  }

  update(data: User): Promise<User> {
    return this.databaseService.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove(userOrUserId: User | string): Promise<User> {
    if (typeof userOrUserId == 'string') {
      return this.databaseService.user.delete({
        where: {
          id: userOrUserId,
        },
      });
    } else {
      return this.databaseService.user.delete({
        where: {
          id: userOrUserId.id,
        },
      });
    }
  }
}
