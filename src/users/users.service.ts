import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel:Model<User>){}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      return await user.save();
    } catch (err) {
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllUser(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (err) {
      throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }  
  }

  async findOneUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (err) {
      throw new HttpException('Error finding user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmailId(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        } as User;
      }
      throw new NotFoundException('User not found');
    } catch (err) {
      throw new HttpException('Error fetching user by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      }).exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (err) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUser(id: number): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return deletedUser;
    } catch (err) {
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
