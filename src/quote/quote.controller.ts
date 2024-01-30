import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(
    @Body('quote') quote: string,
    @Body('author') author: string,
    @Body('verified') verified: boolean,
    @Body('categories') categories: string[],
  ) {
    return this.quoteService.createQuote(quote, author, verified, categories);
  }

  @Get()
  async getAllQuotes() {
    return this.quoteService.getAllQuotes();
  }

  @Get('by-id/:id')
  async getQuoteById(@Param('id') id: string) {
    return this.quoteService.getQuoteById(id);
  }

  @Get('random')
  async getRandomQuote() {
    return this.quoteService.getRandomQuote();
  }

  @Delete(':id')
  async deleteQuote(@Param('id') id: string) {
    await this.quoteService.deleteQuote(id);
  }
}
