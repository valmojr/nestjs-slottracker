import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [SessionController],
  providers: [DatabaseService, SessionService],
})
export class SessionModule {}
