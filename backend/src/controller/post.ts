import { Controller, Post, Body, Inject, Get, Query } from '@midwayjs/core';
import { PostService } from '../service/post';

@Controller('/post')
export class PostController {
    @Inject()
    postService: PostService;

    @Post('/')
    async createPost(@Body() body: { circle_id: number; content: string; imageUrl: string; author_id: number }) {

        await this.postService.createPost(body.circle_id, body.content, body.imageUrl, body.author_id);
        return { success: true, message: 'Post created successfully' };

    }

    @Get('/circle')
    async getPostsByCircleId(@Query('circle_id') circleId: number) {
        try {
            const posts = await this.postService.findPostsByCircleId(circleId);
            return posts;
        } catch (error) {
            return { message: 'Error fetching posts', error };
        }
    }

    @Post('/like')
    async updateLikes(@Body() body: { id: number; likes: number; userId: number; liked: boolean }) {
        const { id, likes, userId, liked } = body;
        return await this.postService.updateLikes(id, likes, userId, liked);
    }


    @Post('/user/count')
    async getUserPostCount(@Body() body: { userId: number }) {
        const { userId } = body;
        const count = await this.postService.getPostCountByUser(userId);
        return {
            status: 'success',
            data: count,
        };
    }

    @Post('/user/likes')
    async getUserTotalLikes(@Body() body: { userId: number }) {
        const { userId } = body;
       
        const totalLikes = await this.postService.getTotalLikesByUser(userId);
        return {
            status: 'success',
            data: totalLikes,
        };
    }
}
