import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordLogin() {
    // This route will trigger the Discord OAuth2 flow.
    return 'Discord OAuth2 flow';
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  async discordCallback(@Req() req, @Res() res) {
    // After successful authentication, the user will be redirected here.
    // You can process the user data in the request "req.user" and
    // handle your own logic (e.g., store user info in the session).

    // Redirect the user to another page after successful login.
    return res.redirect('/dashboard'); // Change '/dashboard' to your desired URL.
  }
}
