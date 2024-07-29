import { Provide, Init } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle';

@Provide()
export class CircleService {

    @InjectEntityModel(Circle)
    circleModel: ReturnModelType<typeof Circle>;

    private currentId = 0;

    @Init()
    async init() {
        const maxCircle = await this.circleModel.findOne().sort({ id: -1 }).exec();
        if (maxCircle) {
            this.currentId = maxCircle.id;
        }
    }

    async createCircle(name: string, description: string, imageUrl: string, author_id: number) {
        const id = ++this.currentId;

        const now = new Date();
        const offset = 8 * 60;
        const chinaTime = new Date(now.getTime() + offset * 60 * 1000);

        const year = chinaTime.getUTCFullYear();
        const month = chinaTime.getUTCMonth() + 1; // 月份从0开始，所以要加1
        const day = chinaTime.getUTCDate();

        const result = `${year}-${month}-${day}`;


        await this.circleModel.create({
            id: id,
            name: name,
            description: description,
            author_id: author_id,
            imageUrl: imageUrl,
            created_at: result, // 直接传递 Date 对象
            updated_at: result, // 同上
            users: [author_id] // 将 author_id 添加到 users 数组中
        } as Circle);
    }
}
