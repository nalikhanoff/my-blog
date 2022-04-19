import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.schema';
import { CreateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  async createBlog(@Body() dto: CreateBlogDto, @CurrentUser() user: User) {
    return this.blogService.createBlog(dto, user['id']);
  }

  @Get()
  async getBlogs() {
    return this.blogService.getBlogs();
  }

  @Get(':id')
  async getBlog(@Param('id') id: string) {
    return this.blogService.getBlog(id);
  }

  @Patch(':id')
  async editBlog(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: CreateBlogDto,
  ) {
    return this.blogService.editBlog(id, dto, user['id']);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string, @CurrentUser() user: User) {
    return this.blogService.deleteBlog(id, user['id']);
  }
}
