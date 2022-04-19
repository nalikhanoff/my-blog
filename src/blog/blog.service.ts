import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async createBlog(dto: CreateBlogDto, id: string) {
    const blog = new this.blogModel();
    blog.name = dto.name;
    blog.content = dto.content;
    blog.author = new Types.ObjectId(id);
    return blog.save();
  }

  async getBlogs() {
    return this.blogModel.find();
  }

  async getBlog(id: string) {
    return this.blogModel.findById(id);
  }

  async deleteBlog(id: string, author: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog || blog.author.toString() !== author) throw new NotFoundException();
    return blog.delete();
  }

  async editBlog(id: string, dto: CreateBlogDto, author: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog || blog.author.toString() !== author) throw new NotFoundException();
    blog.name = dto.name;
    blog.content = dto.content;
    return blog.save();
  }
}
