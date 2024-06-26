import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import { EmailModule } from './email/email.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nataniel:ihXbkdrkIacK5N8b@testebanco.vxd9vmh.mongodb.net/?retryWrites=true&w=majority&appName=TesteBanco'),
    AuthModule, 
    PostsModule,
    UsersModule,
    LikesModule,
    CommentsModule,
    UploadModule,
    EmailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
