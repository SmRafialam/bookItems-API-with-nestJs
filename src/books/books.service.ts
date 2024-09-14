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
    try {
      const newBook = new this.bookModel(createBookDto);
      return await newBook.save();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  // Find all books
  async findAllBooks(): Promise<Books[]> {
    try {
      return await this.bookModel.find().exec();
    } catch (error) {
      console.error('Error finding all books:', error);
      throw error;
    }  
  }

  // Find a single book by ID
  async findOneBook(id: string): Promise<Books> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return book;   

    } catch (error) {
      console.error('Error finding book:', error);
      throw error;
    }
  }

  // Update a book by ID
  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Books> {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return updatedBook;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  // Remove a book by ID
  async removeBook(id: string): Promise<Books> {
    try {
      const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
      if (!deletedBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return deletedBook;   
    } catch(error){
      console.error('Error deleting book:', error);
      throw error;
    }
  }
}
