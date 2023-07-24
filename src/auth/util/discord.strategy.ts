import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ['identify', 'email', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return profile;
  }
}
