import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}

  private logger = new Logger(AuthService.name);

  async validateUser(details: User) {
    const { id } = details;
    const user = await this.findUser(id);
    if (user) {
      await this.userService.update(details);
      this.logger.log(`Update user ${id} - ${details.username}`);
      return user;
    }
    return this.createUser(details);
  }

  createUser(details: User) {
    return this.userService.create(details);
  }

  findUser(discordId: string): Promise<User | undefined> {
    return this.userService.find(discordId);
  }

  findSession(id: string) {
    return this.databaseService.session.findUnique({ where: { id } });
  }
}
