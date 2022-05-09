import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findByUsernameOrEmail(usernameOrEmail: string) {
    return this.userModel.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    });
  }

  async findById(id: string) {
    return this.userModel.findById(new ObjectId(id));
  }

  async create(payload: object) {
    const { password, ...data }: any = payload;
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(password, saltOrRounds);
    return new this.userModel(data).save();
  }
}
