import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private authService: AuthService) {}
  
  async me(post: User): Promise<any> {
    return this.userModel.findById(post._id).exec();
  }

  async user(id: string): Promise<any> {
    return this.userModel.findById(id).exec();
  }

  async register(name : string, email: string, pass: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    const newUser = new this.userModel({ name, email, password: hashedPassword });
    await newUser.save();
    return this.authService.validateUser(email, pass);
  }

  async update(id: string, post: User): Promise<any> {
    return this.userModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

}