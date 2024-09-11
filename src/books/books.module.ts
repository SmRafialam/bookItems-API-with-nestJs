import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Books', schema: BookSchema}])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
