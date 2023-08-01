import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async generateToken(user: any): Promise<string> {
    if (user.id) {
      const payload = {
        sub: user.id,
        username: user.username,
        avatar: user.avatar,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      };

      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('User not found');
  }
}
