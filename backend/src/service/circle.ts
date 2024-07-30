// src/service/circle.ts
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle';

@Provide()
export class CircleService {
    @InjectEntityModel(Circle)
    private circleModel: ReturnModelType<typeof Circle>;

    async findAll(): Promise<Circle[]> {
   
        return this.circleModel.find({}).select('id name author_id description created_at updated_at imageUrl').exec();
    }

    // 获取所有兴趣圈名字
    async findAllNames() {
        return this.circleModel.find({}).select('name').exec(); // 只选择 'name' 字段
    }

    // 依据兴趣圈名字获取其id
    async findIdByName(name: string) {
        const circle = await this.circleModel.findOne({ name }).exec();
        return circle ? circle.id : null;
    }
}
