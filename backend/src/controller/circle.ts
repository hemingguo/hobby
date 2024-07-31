// src/controller/circle.ts
import { Controller, Get, Inject, Query, Post, Body } from '@midwayjs/core';
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

    @Post('/join')
    async joinCircle(@Body() body: { circle_id: number; user_id: number }) {

        const { circle_id, user_id } = body;
        console.log(body)
        try {
            
            const res = await this.circleService.addUserToCircle(circle_id, user_id);
            if (res === false) {
                return { success: true, message: 'Successfully joined the circle' };
            }else{
                return { success: true, message: 'You have joined the circle' };
            }

        } catch (error) {
            return { success: false, message: 'Failed to join the circle', error: error.message };
        }
    }
}
