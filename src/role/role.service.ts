import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoleService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Role): Promise<Role> {
    data.id = randomUUID();

    return this.databaseService.role.create({
      data,
    });
  }

  findAll(): Promise<Role[]> {
    return this.databaseService.role.findMany();
  }

  find(roleOrRoleId: Role | string): Promise<Role> {
    if (typeof roleOrRoleId == 'string') {
      return this.databaseService.role.findUnique({
        where: {
          id: roleOrRoleId,
        },
      });
    } else {
      return this.databaseService.role.findUnique({
        where: {
          id: roleOrRoleId.id,
        },
      });
    }
  }

  update(data: Role): Promise<Role> {
    return this.databaseService.role.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  remove(roleOrRoleId: Role | string): Promise<Role> {
    if (typeof roleOrRoleId == 'string') {
      return this.databaseService.role.delete({
        where: {
          id: roleOrRoleId,
        },
      });
    } else {
      return this.databaseService.role.delete({
        where: {
          id: roleOrRoleId.id,
        },
      });
    }
  }
}
