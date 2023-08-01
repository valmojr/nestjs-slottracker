import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

type Done = (err: Error, user: User) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser({ id }: User, done: Done) {
    const userDB = await this.authService.findUser(id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
