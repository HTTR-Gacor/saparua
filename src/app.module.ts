import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { QuoteModule } from './quote/quote.module';
import { CategoryModule } from './category/category.module';
import { QuoteCategoryModule } from './quote-category/quote-category.module';

@Module({
  imports: [ConnectionModule, QuoteModule, CategoryModule, QuoteCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
