import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './DTO/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    const user = new this.userModel(dto);
    return user.save();
  }
}
