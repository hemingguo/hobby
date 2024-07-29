// src/controller/circle.ts
import { Controller, Get, Inject } from '@midwayjs/core';
import { CircleService } from '../service/circle';

@Controller('/circle')
export class CircleController {

    @Inject()
    circleService: CircleService;

    @Get('/')
    async getAllCircles() {
        try {
            //console.log("开始准备找了")
            const circles = await this.circleService.findAll();
            console.log(circles)
            return {
                status: 'success',
                data: circles
            };
        } catch (error) {
            return {
                status: 'error',
                message: 'Failed to retrieve circles',
                error: error.message
            };
        }
    }
}
