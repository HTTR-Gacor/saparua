import { Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class CategoryService {
  async getAllCategories() {
    const prisma = ConnectionService.connectDb();
    const categories = await prisma.category.findMany();
    return categories;
  }

  async createCategory(name: string) {
    const prisma = ConnectionService.connectDb();
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return newCategory;
  }

  async deleteCateogry(id: string) {
    const prisma = ConnectionService.connectDb();
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
