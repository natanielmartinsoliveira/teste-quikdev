import { Controller, Post, Body, UseGuards, Req, ConflictException, Param, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { Post as PostEntity } from '../posts/post.schema';
import { User as UserEntity } from '../users/user.schema';
export type RequestWithUser = Request & { user: UserEntity }

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async likeOrDislike(@Body('postId') postId: string, @Body('type') type: string, @Req() request: RequestWithUser) {
    const userId = request.user._id;
    if (type == 'like') {
      return this.likesService.likePost(userId, postId);
    } else if (type == 'dislike') {
      return this.likesService.dislikePost(userId, postId);
    } 
  }

  @UseGuards(AuthGuard)
  @Get(':id/likes')
  async getLikes(@Param('id') postId: string) {
    return await this.likesService.getLikes(postId);
  }

}
