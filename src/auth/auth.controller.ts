import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { DiscordAuthGuard, AuthenticatedGuard } from './util/discord.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.redirect('/api/auth/status');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: any) {
    const jwtToken = await this.authService.generateToken(
      req.session.passport?.user,
    );
    return { access_token: jwtToken };
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request) {
    req.logOut(null);
  }
}
