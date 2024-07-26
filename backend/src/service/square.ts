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
        //const createAt = new Date();
        //const updateAt = new Date();


        await this.circleModel.create({
            id: id,
            name: name,
            description: description,
            //created_at: createAt,
            //updated_at: updateAt,
        } as Circle);

    }
}
