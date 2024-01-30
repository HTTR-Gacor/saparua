import { Body, Controller, Post } from '@nestjs/common';
import { QuoteCategoryService } from './quote-category.service';

@Controller('quote-category')
export class QuoteCategoryController {
  constructor(private readonly quoteCategoryService: QuoteCategoryService) {}

  @Post()
  async createQuoteCategory(
    @Body('quoteId') quoteId: string,
    @Body('categories') categories: { name: string; id: string }[],
  ) {
    return this.quoteCategoryService.createQuoteCategory(quoteId, categories);
  }
}
