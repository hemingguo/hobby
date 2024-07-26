import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { UserRL } from '../service/user';

@Controller('/logic')
export class LogicController {

    @Inject()
    userLogic: UserRL;

    constructor() {
        console.log('LogicController has been instantiated');
    }

    @Post('/')
    async login(@Body() userData: { phone: string, password: string }) {
        try {
            const result = await this.userLogic.validateUserCredentials(userData.phone);
            if (result) {
                if (result.password === userData.password) {
                    return { success: true, message: 'Login successful', id: result.id};
                } else {
                    return { success: false, message: 'Invalid password' };
                }
            } else {
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Login failed due to server error' };
        }
    }
}
