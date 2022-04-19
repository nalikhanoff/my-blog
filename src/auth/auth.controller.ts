import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { UserDto } from './DTO/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: UserDto) {
    return user;
  }
}
