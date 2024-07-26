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

    async createCircle(name: string, description: string) {
        const id = ++this.currentId;

        // 获取东八区的当前时间
        const now = new Date();
        const offset = 8 * 60; // 
        const chinaTime = new Date(now.getTime() + offset * 60 * 1000);

        await this.circleModel.create({
            id: id,
            name: name,
            description: description,
            created_at: chinaTime, // 直接传递 Date 对象
            updated_at: chinaTime, // 同上
        } as Circle);
    }
}
