import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { UserRL } from '../service/user';

@Controller('/register')
export class RegisterController {

    @Inject()
    userRegister: UserRL;

    constructor() {
        console.log('RegisterController has been instantiated');
    }

    @Post('/')
    async reg(@Body() userData: { phone: string, password: string }) {
        await this.userRegister.createUser(userData.phone, userData.password);
        return { message: 'User registered successfully' };
    }


}


