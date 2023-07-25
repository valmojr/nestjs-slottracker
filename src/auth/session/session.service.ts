import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createSession(data: Session) {
    return this.databaseService.session.create({ data });
  }

  async getSession(dataOrDataId: Session | string) {
    if (typeof dataOrDataId == 'string') {
      return this.databaseService.session.findUnique({
        where: { id: dataOrDataId },
      });
    } else {
      return this.databaseService.session.findUnique({
        where: { id: dataOrDataId.id },
      });
    }
  }

  async updateSession(data: Session) {
    return this.databaseService.session.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteSession(dataOrDataId: Session | string) {
    if (typeof dataOrDataId == 'string') {
      return this.databaseService.session.delete({
        where: { id: dataOrDataId },
      });
    } else {
      return this.databaseService.session.delete({
        where: { id: dataOrDataId.id },
      });
    }
  }
}
