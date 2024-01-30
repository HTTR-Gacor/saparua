import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class ConnectionService {
  private static client: MongoClient;

  static async connectDb(): Promise<Db> {
    if (!this.client) {
      this.client = new MongoClient(process.env.DATABASE_URL);

      await this.client
        .connect()
        .then(() => console.log('Connected to database'))
        .catch((err) => console.error('Error connecting to database', err));
    }
    return this.client.db();
  }
}
