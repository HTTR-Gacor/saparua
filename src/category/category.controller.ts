import { Body, Controller, Get, Post } from '@nestjs/common';
// import { QuoteService } from 'src/quote/quote.service';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}