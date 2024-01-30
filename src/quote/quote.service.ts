import { Injectable } from '@nestjs/common';
import { Quote } from '@prisma/client';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class QuoteService {
  async getAllQuotes(): Promise<Quote[]> {
    const prisma = ConnectionService.connectDb();
    const quotes = await prisma.quote.findMany();
    return quotes;
  }

  async getQuoteById(id: string) {
    const prisma = ConnectionService.connectDb();
    const quote = await prisma.quote.findUnique({
      where: {
        id,
      },
    });
    const categories = await prisma.quoteCategory.findMany({
      where: {
        quoteId: quote.id,
      },
    });
    const res = {
      ...quote,
      categories,
    };
    return res;
  }

  async getRandomQuote() {
    const quotes: Quote[] = await this.getAllQuotes();
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async createQuote(quote: string, author: string, verified: boolean) {
    const prisma = ConnectionService.connectDb();
    const newQuote = await prisma.quote.create({
      data: {
        quote,
        author,
        verified,
      },
    });

    return newQuote;
  }

  async editQuote(quote: string, author: string, verified: boolean) {
    const prisma = ConnectionService.connectDb();
    // const editQuote = await prisma.quote.update({
    //   data: {
    //     quote,
    //     author,
    //     verified,
    //   },
    // });

    // return editQuote;
  }
}
