import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { CircleService } from '../service/square';

@Controller('/square')
export class SquareController {
    @Inject()
    circleService: CircleService;

    @Post('/')
    async createSquare(@Body() body: { name: string; intro: string; imageUrl: string; author_id: number }) {
        
            await this.circleService.createCircle(body.name, body.intro, body.imageUrl, body.author_id);
            return { success: true, message: 'Circle created successfully' };
        
    }
}
