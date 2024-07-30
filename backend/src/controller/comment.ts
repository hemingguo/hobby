import { Controller, Post, Get, Body, Query, Inject } from '@midwayjs/core';
import { CommentService } from '../service/comment';

@Controller('/comment')
export class CommentController {

    @Inject()
    commentService: CommentService;


    @Post('/')
    async addComment(@Body() body: { postId: number; authorId: number; content: string }) {
        const { postId, authorId, content } = body;

        return await this.commentService.addComment(postId, authorId, content);
        
    }

    @Get('/')
    async getComments(@Query('postId') postId: number) {
        return await this.commentService.getComments(postId);
    }

    @Get('/count')
    async getCommentCount(@Query('postId') postId: number) {
        return await this.commentService.getCommentCount(postId);
    }

}
