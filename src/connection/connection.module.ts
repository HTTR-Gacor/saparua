import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Module({
  providers: [ConnectionService],
})
export class ConnectionModule {}
