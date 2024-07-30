// src/controller/circle.ts
import { Controller, Get, Inject, Query } from '@midwayjs/core';
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

    @Get('/names')
    async getAllCirclesNames() {


        try {
            const data = await this.circleService.findAllNames();
            return {
                status: 'success',
                circles: data,
            };
        } catch (error) {
            return {
                status: 'error',
                message: 'Failed to retrieve circles',
                error: error.message
            };
        }
    }

    @Get('/id')
    async getIdByCircleName(@Query('name') name: string) {
        const id = await this.circleService.findIdByName(name);
        return { id };
    }
}
