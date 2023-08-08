import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [GroupController],
  providers: [DatabaseService, GroupService],
})
export class GroupModule {}
