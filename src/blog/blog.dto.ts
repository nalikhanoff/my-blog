import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  name: string;

  @IsString()
  content: string;
}
