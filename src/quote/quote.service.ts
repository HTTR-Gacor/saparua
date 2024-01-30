import { Injectable } from '@nestjs/common';
import { Quote } from '@prisma/client';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class QuoteService {
  async getAllQuotes(): Promise<Quote[]> {
    const prisma = ConnectionService.connectDb();
    const quotes = await prisma.quote.findMany({
      include: {
        categories: true,
      },
    });
    return quotes;
  }

  async getQuoteById(id: string) {
    const prisma = ConnectionService.connectDb();
    const quote = await prisma.quote.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });

    return quote;
  }

  async getRandomQuote() {
    const quotes: Quote[] = await this.getAllQuotes();
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async createQuote(
    quote: string,
    author: string,
    verified: boolean,
    categories: string[],
  ) {
    const prisma = ConnectionService.connectDb();

    const setCategories = categories.map((category) => ({
      id: category,
    }));

    const newQuote = await prisma.quote.create({
      data: {
        quote,
        author,
        verified,
        categories: { connect: setCategories },
      },
      include: {
        categories: true,
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

  async deleteQuote(id: string) {
    const prisma = ConnectionService.connectDb();
    await prisma.quote.delete({
      where: {
        id,
      },
    });
  }
}
