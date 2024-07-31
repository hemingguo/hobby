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

    // 将用户添加至兴趣圈
    async addUserToCircle(circle_id: number, user_id: number): Promise<boolean> {
        let joined = false;
        const id = circle_id
        const circle = await this.circleModel.findOne({ id }).exec();


        if (!circle) {
            throw new Error('Circle not found');
        }



        if (!circle.users.includes(user_id)) {

            circle.users.push(user_id);
            await circle.save();
            return joined;
        }
        joined = true;
        return joined;
    }

    // 返回该用户加入的所有兴趣圈
    async findCirclesByUserId(userId: number) {

        return await this.circleModel.find({ users: userId }).exec();

    }

    async removeUserFromCircle(circleId: number, userId: number): Promise<boolean> {
        try {
            const circle = await this.circleModel.findOne({ id: circleId });
            if (!circle) return false;

            const userIndex = circle.users.indexOf(userId);
            if (userIndex > -1) {
                circle.users.splice(userIndex, 1);
                await circle.save();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing user from circle:', error);
            return false;
        }
    }


    async getCirclesCountByUser(userId: number): Promise<number> {
        
        const count = await this.circleModel.countDocuments({ users: userId }).exec();
        return count;
    }
}
