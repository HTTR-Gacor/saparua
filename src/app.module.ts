import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { QuoteModule } from './quote/quote.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConnectionModule, QuoteModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
