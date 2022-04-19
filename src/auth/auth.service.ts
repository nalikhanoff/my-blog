import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { UserDto } from './DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: UserDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }
    const user = new this.userModel(dto);
    await user.save();
    const token = this.jwtService.sign(user.toJSON());
    return { token, user };
  }

  async login(dto: UserDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const token = this.jwtService.sign(user.toJSON());
    return {token, user}
  }
}
