import { Module } from '@nestjs/common';
import { QuoteCategoryService } from './quote-category.service';
import { QuoteCategoryController } from './quote-category.controller';

@Module({
  providers: [QuoteCategoryService],
  controllers: [QuoteCategoryController],
})
export class QuoteCategoryModule {}
