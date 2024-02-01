import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createQuote(
    @Body('quote') quote: string,
    @Body('author') author: string,
    @Body('verified') verified: boolean,
    @Body('categoryIds') categoryIds: string[],
  ) {
    return this.quoteService.createQuote(quote, author, verified, categoryIds);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async editQuote(
    @Param('id') id: string,
    @Body('quote') quote: string,
    @Body('author') author: string,
    @Body('verified') verified: boolean,
    @Body('categoryIds') categoryIds: string[],
  ) {
    return this.quoteService.editQuote(
      id,
      quote,
      author,
      verified,
      categoryIds,
    );
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteQuote(@Param('id') id: string) {
    return this.quoteService.deleteQuote(id);
  }
}
