import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/util/discord.guard';
import { UserService } from './user.service';

@Controller('userme')
export class UserMeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  findMe(@Req() req: any) {
    const reqUser = req.sessions?.passport?.user;
    console.log(`reUser\n${reqUser}\n`);
    const user = this.userService.find(reqUser);
    console.log(`User\n${reqUser}\n`);

    return user;
  }
}
