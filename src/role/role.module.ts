import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [RoleController],
  providers: [DatabaseService, RoleService]
})
export class RoleModule {}
