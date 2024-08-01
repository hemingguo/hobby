import { Controller, Get, Post, Body, Inject } from '@midwayjs/core';
import { UserRL } from '../service/user';

@Controller('/home')
export class HomeController {



    @Inject()
    userService: UserRL;


    @Get('/')
    async home() {

        return "Hello, Hobby Square!";
    }

    @Post('/image')
    async getImageUrl(@Body() body: { userId: number }) {
        //console.log("请求的是" + body.userId)
        const imageUrl = await this.userService.getImageUrl(body.userId);
        //console.log("结果是" + imageUrl)
        if (imageUrl) {
            return { status: 'success', imageUrl };
        } else {
            return { status: 'error', message: 'User not found' };
        }
    }
    @Post('/users')
    async getUsersInfo(@Body() body: { userIds: number[] }) {


        const usersInfo = await this.userService.getUsersInfo(body.userIds);


        return {
            status: 'success',
            data: usersInfo,
        };
    }

    @Post('/getUsername')
    async getUsername(@Body() body: { author_id: number }): Promise<{ username: string | null }> {
        const { author_id } = body;
        const username = await this.userService.getUsernameById(author_id);
        return { username };
    }
}