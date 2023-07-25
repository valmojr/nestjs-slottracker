import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private authService: AuthService) {
    super({
      authorizationURL: `https://discordapp.com/api/oauth2/authorize?${stringify(
        {
          client_id: process.env.DISCORD_CLIENT_ID,
          redirect_uri: process.env.DISCORD_REDIRECT_URL,
          response_type: 'code',
          scope: 'identify',
        },
      )}`,
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      scope: 'identify email guilds',
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
    });
  }

  async validate(accessToken: string): Promise<any> {
    const response = await fetch('https://discordapp.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id, username, email, avatar } = await response.json();

    return this.authService.findOrRegisterUserFromDiscordId({
      id,
      username,
      email,
      avatar,
    });
  }
}
