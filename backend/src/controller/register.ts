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
    async reg(@Body() userData: { phone: string, username: string, password: string, imageUrl: string }) {
      
        await this.userRegister.createUser(userData.phone, userData.username, userData.password, userData.imageUrl);
        return { message: 'User registered successfully' };
    }


}


