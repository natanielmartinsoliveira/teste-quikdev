import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { User } from 'src/users/user.schema';
import { Post } from 'src/posts/post.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>,
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Post.name) private postModel: Model<Post>, 
                private emailService: EmailService) {}

    async findAll(postId: any): Promise<Comment[]> {
        if(postId){
            return this.commentModel.find({ postId : postId }).populate('user').exec();
        }
        return this.commentModel.find().populate('user').exec();
    }

    async findOne(id: string): Promise<Comment> {
        return this.commentModel.findById(id).exec();
    }

    async create(comment: Comment, user: any, postId : string, text: string): Promise<Comment> {
        const userId = user._id;
        const post : Post = await this.postModel.findOne({_id: postId});
        comment.postId = [post];
        comment.postUserId = await this.userModel.findOne({_id: post.userId});
        comment.userId = await this.userModel.findOne({_id: userId});
        comment.description = text;
        const newComment = new this.commentModel(comment);
        const emailAuthor = await this.userModel.findOne({_id: post.userId});
        // Enviar email para o dono do post
        if(emailAuthor?.email){
            await this.emailService.sendMail(
                emailAuthor?.email,
                'Novo comentário no seu post',
                `Você recebeu um novo comentário no seu post: ${text}`,
            );
        }
    
        return newComment.save();
    }

    async update(id: string, commentData: Comment, user: any, content: string): Promise<Comment> {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (comment.userId != user._id) {
            throw new ForbiddenException('You are not allowed to edit this comment');
        }

        comment.description = content;
        return comment.save();

        //return this.commentModel.findByIdAndUpdate(id, comment, { new: true }).exec();
    }

    async delete(id: string, user: any): Promise<any> {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        
        if (comment.userId != user._id) {
            throw new ForbiddenException('You are not allowed to edit this comment');
        }

        comment.deleted = true;
        return comment.save();

    }

}