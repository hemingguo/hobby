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
        console.log("到服务器了")
        return this.circleModel.find({}).select('id name author_id description created_at updated_at imageUrl').exec();
    }
}
