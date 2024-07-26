import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { CircleService } from '../service/square';

@Controller('/square')
export class SquareController {
    @Inject()
    circleService: CircleService;

    @Post('/')
    async createSquare(@Body() body: { name: string; intro: string }) {
        
            await this.circleService.createCircle(body.name, body.intro);
            return { success: true, message: 'Circle created successfully' };
        
    }
}
