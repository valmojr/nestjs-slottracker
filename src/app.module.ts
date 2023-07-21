import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventModule, GroupModule, RoleModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
