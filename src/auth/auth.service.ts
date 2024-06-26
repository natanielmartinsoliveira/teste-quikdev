import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email : email});

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      const payload = { _id: user._id, email: user.email, name: user.name };
      return {
        ...payload,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }


  
}
