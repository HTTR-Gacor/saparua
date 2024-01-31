import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';

const internalServerError = new HttpException(
  'Something went wrong',
  HttpStatus.INTERNAL_SERVER_ERROR,
);

const noCategoryWithSuchId = new HttpException(
  'No category with such ID',
  HttpStatus.BAD_REQUEST,
);

@Injectable()
export class CategoryService {
  async getAllCategories() {
    try {
      const prisma = ConnectionService.connectDb();
      const categories = await prisma.category.findMany();
      return categories;
    } catch (err) {
      console.log(err);
      throw internalServerError;
    }
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
