import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Quote } from '@prisma/client';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class QuoteService {
  async getAllQuotes(): Promise<Quote[]> {
    try {
      const prisma = ConnectionService.connectDb();
      const quotes = await prisma.quote.findMany({
        include: {
          categories: true,
        },
      });

      return quotes;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getQuoteById(id: string) {
    try {
      const prisma = ConnectionService.connectDb();
      const quote = await prisma.quote.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
        },
      });

      if (!quote) {
        throw new HttpException(
          'No quote with such ID',
          HttpStatus.BAD_REQUEST,
        );
      }

      return quote;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRandomQuote() {
    const quotes: Quote[] = await this.getAllQuotes();
    try {
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createQuote(
    quote: string,
    author: string,
    verified: boolean,
    categoryIds: string[],
  ) {
    const prisma = ConnectionService.connectDb();

    const setCategoryIds = categoryIds.map((id) => ({
      id,
    }));

    const newQuote = await prisma.quote.create({
      data: {
        quote,
        author,
        verified,
        categories: { connect: setCategoryIds },
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
