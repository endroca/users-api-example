import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      return user;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const users = await this.userModel.findOne({ _id: id }).exec();
      return users;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const users = await this.userModel
        .findOneAndUpdate({ _id: id }, updateUserDto)
        .exec();

      return users;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }

  async updateAll(user: UpdateUserDto): Promise<number> {
    try {
      const result = await this.userModel.updateMany({}, user).exec();

      return result.modifiedCount;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel
        .findByIdAndRemove({ _id: id })
        .exec();
      return deletedUser;
    } catch (e) {
      throw new HttpException('Unexpected error', HttpStatus.BAD_GATEWAY);
    }
  }
}
