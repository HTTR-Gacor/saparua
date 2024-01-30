import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class QuoteCategoryService {
  async createQuoteCategory(
    quoteId: string,
    categories: { name: string; id: string }[],
  ) {
    const prisma = ConnectionService.connectDb();
    const data = categories.map((category) => ({
      quoteId,
      categoryId: category.id,
      name: category.name,
    }));

    await prisma.quoteCategory.createMany({
      data,
    });

    return { message: 'Success' };
  }

  async deleteQuoteCategory(quoteId: string, categoryId: string) {
    const prisma = ConnectionService.connectDb();
    await prisma.quoteCategory.deleteMany({
      where: {
        quoteId,
        categoryId,
      },
    });
  }
}
