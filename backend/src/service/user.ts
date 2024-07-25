import { Provide, Init } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

@Provide()
export class UserRL {

    @InjectEntityModel(User)
    userModel: ReturnModelType<typeof User>;

    private currentId = 0; // 私有计数器

    @Init()
    async init() {
        const maxUser = await this.userModel.findOne().sort({ id: -1 }).exec();
        if (maxUser) {
            this.currentId = maxUser.id;
        }
    }

    async createUser(phone: string, password: string) {
        // create user
        const id = ++this.currentId; // 获取并递增计数器
        await this.userModel.create({ id: id, phone: phone, password: password } as User); // an "as" assertion, to have types for all properties
    }


    async validateUserCredentials(phone: string) {
        console.log(`Searching for phone: ${phone}`);
        const user = await this.userModel.findOne({ phone }).exec();
        console.log(`Query result: ${JSON.stringify(user)}`);
        return user ? user.password : null;
    }

}