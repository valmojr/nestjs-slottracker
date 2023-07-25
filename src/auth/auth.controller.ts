import { Controller, Get, UseGuards, Req, Res, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {
    this.logger.log('Someone just started logging in with Discord');
    return {
      message: 'Discord Login',
    };
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordCallback(@Req() req: Request, @Res() res: Response) {
    // Get the authorization code from the query parameters.
    const code = req.query.code as string;
    const session = req.query.session as any;

    this.logger.log(code);
    this.logger.log(session);

    // Check if the code exists before proceeding.
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing.' });
    }

    try {
      // Make a POST request to exchange the code for an access token.
      const data = {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URL,
        scope: 'identify email guilds',
      };

      const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {},
      });

      const accessToken = await response.json();

      this.logger.log(accessToken);
    } catch (error) {
      console.error('Error exchanging code for access token:', error.message);
      return res
        .status(500)
        .json({ error: 'Failed to fetch user information' });
    }
  }
}
