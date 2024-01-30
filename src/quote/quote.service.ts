import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class QuoteService {
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
}
