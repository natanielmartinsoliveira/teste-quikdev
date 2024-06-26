import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment as CommentEntity } from './comment.schema';
import { User as UserEntity } from '../users/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
export type RequestWithUser = Request & { user: UserEntity }

@Controller('comments')
    export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async findAll(@Query('postId') postId?: any) {
        return this.commentsService.findAll(postId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.commentsService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() comment: CommentEntity, @Body('text') text: string, @Body('postId') postId: string, @Req() request: RequestWithUser) {
        return this.commentsService.create(comment, request.user, postId, text);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() comment: CommentEntity, @Body('content') content: string, @Req() request: RequestWithUser) {
        return this.commentsService.update(id, comment, request.user, content);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string, @Req() request: RequestWithUser) {
        return this.commentsService.delete(id, request.user);
    }
}