import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.schema';
import { User as UserEntity } from '../users/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
export type RequestWithUser = Request & { user: UserEntity }
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')

export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Diretório de destino
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  create(@Body() post: any, @Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.postsService.create(post, request.user, file);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Diretório de destino
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  update(@Param('id') id: string, @Body() post: any, @Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.postsService.update(id, post, request.user, file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.postsService.delete(id, request.user);
  }

  @Get(':id/history')
  //@UseGuards(AuthGuard)
  getHistory(@Param('id') id: string) {
    return this.postsService.getHistory(id);
  }

}