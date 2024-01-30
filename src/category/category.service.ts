import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class CategoryService {
  async createCategory(name: string) {
    const prisma = ConnectionService.connectDb();
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return newCategory;
  }
  async deleteCateogry(id: string, name: string) {
    const prisma = ConnectionService.connectDb();
    await prisma.category.delete({
      where: {
        id: id,
        name: name,
      },
    });
    await prisma.quoteCategory.deleteMany({
      where: {
        categoryId: id,
      },
    });
  }
}
