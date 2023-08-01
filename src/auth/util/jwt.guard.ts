import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const activate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return activate;
  }
}

@Injectable()
export class JwtAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const reqUser = req.session.passport?.user;
    console.log('reqUser ', reqUser);
    return reqUser;
  }
}
