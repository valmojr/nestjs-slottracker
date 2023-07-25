import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger('AuthService');

  async findOrRegisterUserFromDiscordId(discordUser: User): Promise<any> {
    const user = await this.userService.find(discordUser.id);

    if (!user) {
      this.logger.warn(
        `User with discordId ${discordUser.id} not found, registering a new one`,
      );

      this.userService.create(discordUser);

      this.logger.log(`${discordUser.id} - ${discordUser.username} registered`);
    }

    return user;
  }
}
