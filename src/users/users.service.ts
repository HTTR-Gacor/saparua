import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class UsersService {
  private readonly prisma = ConnectionService.connectDb();

  async findOne(username: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });

      return user;
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException(
            'User with such username cannot be found',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
