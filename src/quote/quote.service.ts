import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quote } from '@prisma/client';
import { ConnectionService } from 'src/connection/connection.service';

const internalServerError = new HttpException(
  'Something went wrong',
  HttpStatus.INTERNAL_SERVER_ERROR,
);

const noQuoteWithSuchId = new HttpException(
  'No quote with such ID',
  HttpStatus.BAD_REQUEST,
);

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
      throw internalServerError;
    }
  }

  async getQuoteById(id: string) {
    try {
      const prisma = ConnectionService.connectDb();
      const quote = await prisma.quote.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          categories: true,
        },
      });

      return quote;
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw noQuoteWithSuchId;
        }
      }
      throw internalServerError;
    }
  }

  async getRandomQuote() {
    const quotes: Quote[] = await this.getAllQuotes();
    try {
      const index = Math.floor(Math.random() * quotes.length);
      return quotes[index];
    } catch (err) {
      console.log(err);
      throw internalServerError;
    }
  }

  async createQuote(
    quote: string,
    author: string,
    verified: boolean,
    categoryIds: string[],
  ) {
    try {
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
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new HttpException(
            'Quote with exact words already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (err.code === 'P2025') {
          throw new HttpException(
            'One or more categories cannot be found',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw internalServerError;
    }
  }

  async editQuote(
    id: string,
    quote: string,
    author: string,
    verified: boolean,
    categoryIds: string[],
  ) {
    try {
      const prisma = ConnectionService.connectDb();
      const setCategoryIds = categoryIds.map((id) => ({ id }));
      const modifiedQuote = await prisma.quote.update({
        data: {
          quote,
          author,
          verified,
          categories: { set: setCategoryIds },
        },
        include: {
          categories: true,
        },
        where: {
          id,
        },
      });
      return modifiedQuote;
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw noQuoteWithSuchId;
        }
      }
      throw internalServerError;
    }
  }

  async deleteQuote(id: string) {
    try {
      const prisma = ConnectionService.connectDb();
      await prisma.quote.delete({
        where: {
          id,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully delete quote',
      };
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw noQuoteWithSuchId;
        }
      }
      throw internalServerError;
    }
  }
}
