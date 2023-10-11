import { Injectable } from '@nestjs/common';
import { Guild } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GuildService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Guild): Promise<Guild> {
    data.id = randomUUID();
    return this.databaseService.guild.create({
      data,
    });
  }

  async findAll(): Promise<Guild[]> {
    return this.databaseService.guild.findMany();
  }

  async find(guildOrGuildId: Guild | string): Promise<Guild> {
    if (typeof guildOrGuildId == 'string') {
      return this.databaseService.guild.findUnique({
        where: {
          id: guildOrGuildId,
        },
      });
    } else {
      return this.databaseService.guild.findUnique({
        where: {
          id: guildOrGuildId.id,
        },
      });
    }
  }

  async findByUserId(userid: string): Promise<Guild[]> {
    return await this.databaseService.guild.findMany({
      where: {
        members: {
          some: { id: userid },
        },
      },
    });
  }

  async update(data: Guild): Promise<Guild> {
    return this.databaseService.guild.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async remove(guildOrGuildId: Guild | string): Promise<Guild> {
    if (typeof guildOrGuildId == 'string') {
      return this.databaseService.guild.delete({
        where: {
          id: guildOrGuildId,
        },
      });
    } else {
      return this.databaseService.guild.delete({
        where: {
          id: guildOrGuildId.id,
        },
      });
    }
  }
}
