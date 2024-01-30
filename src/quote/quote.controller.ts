import { Body, Controller, Post } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(
    @Body('quote') quote: string,
    @Body('author') author: string,
    @Body('verified') verified: boolean,
  ) {
    return this.quoteService.createQuote(quote, author, verified);
  }
}
