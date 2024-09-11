import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books } from './interface/books.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly bookModel: Model<Books>,
  ){
  }
  
  // Create a new book
  async createBook(createBookDto: CreateBookDto): Promise<Books> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  // Find all books
  async findAllBooks(): Promise<Books[]> {
    return this.bookModel.find().exec();
  }

  // Find a single book by ID
  async findOneBook(id: string): Promise<Books> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Update a book by ID
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Books> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  // Remove a book by ID
  async removeBook(id: string): Promise<Books> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }
}
