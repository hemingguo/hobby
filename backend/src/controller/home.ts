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
    async getImageUrl(@Body() body: {userId: number}) {
        //console.log("请求的是" + body.userId)
        const imageUrl = await this.userService.getImageUrl(body.userId);
        //console.log("结果是" + imageUrl)
        if (imageUrl) {
            return { status: 'success', imageUrl };
        } else {
            return { status: 'error', message: 'User not found' };
        }
    }
}