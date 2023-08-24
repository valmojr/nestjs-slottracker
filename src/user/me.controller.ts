import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaClient, User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/util/discord.guard';

@Controller('userme')
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger(UserMeController.name);

  private prisma = new PrismaClient();
  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async findMe(@Param('id') sid: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sid },
    });

    if (!session) {
      this.logger.error('Requested a non-existent session id');

      return {
        statusCode: HttpStatus.FORBIDDEN,
      };
    }
    const sessionUser: User = JSON.parse(session.json)?.passport?.user;

    const user = this.userService.find(sessionUser);

    return await user;
  }
}
