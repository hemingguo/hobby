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

    async createUser(phone: string, username: string, password: string, imageUrl: string) {
        // create user
        const id = ++this.currentId; // 获取并递增计数器
        await this.userModel.create({ id: id, phone: phone, username: username, password: password, image: imageUrl } as User); // an "as" assertion, to have types for all properties
    }


    async validateUserCredentials(phone: string) {
        console.log(`Searching for phone: ${phone}`);
        const user = await this.userModel.findOne({ phone }).exec();
        console.log(`Query result: ${JSON.stringify(user)}`);
        return user ? {
            password: user.password,
            id: user.id,
        } : null;
    }

    async getImageUrl(userId: number): Promise<string | null> {
        const user = await this.userModel.findOne({ id: userId }).exec();
        return user ? user.image : null;
    }

    async getUsersInfo(userIds: number[]): Promise<{ [key: number]: { userId: number, image: string, username: string } }> {
        const users = await this.userModel.find({ id: { $in: userIds } }, 'id image username').lean().exec();

        // 创建一个以 userId 为键的对象
        const usersInfoMap: { [key: number]: { userId: number, image: string, username: string } } = {};

        users.forEach(user => {
            usersInfoMap[user.id] = {
                userId: user.id,
                image: user.image,
                username: user.username
            };
        });

        return usersInfoMap;
    }


    async getUsernameById(author_id: number): Promise<string | null> {
        const user = await this.userModel.findOne({ id: author_id }).exec();
        return user ? user.username : null;
    }
}