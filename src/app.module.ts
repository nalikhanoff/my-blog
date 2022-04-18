import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/blog'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
