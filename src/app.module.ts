import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [ConnectionModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
