// src/controller/home.ts

import { Controller, Get, Inject } from '@midwayjs/core';

import { TestService } from '../service/user';

@Controller('/')
export class HomeController {

    @Inject()
    testService: TestService;

    @Get('/')
    async home() {
        // await this.testService.getTest(); // 调用 getTest 方法

        return "Hello Midwayjs!";
    }
}
