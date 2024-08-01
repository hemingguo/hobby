// src/service/circle.ts
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle';
import { Post } from '../entity/post';
import { User } from '../entity/user';

@Provide()
export class CircleService {
    @InjectEntityModel(Circle)
    private circleModel: ReturnModelType<typeof Circle>;
    @InjectEntityModel(Post)
    postModel: ReturnModelType<typeof Post>;

    @InjectEntityModel(User)
    userModel: ReturnModelType<typeof User>;
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
    async fetchActiveUserCount(circleId: number): Promise<number> {
        console.log("查询的是 " + circleId + " 号圈子");

        // 获取今天和一周前的日期
        const now = new Date();
        const todayISO = new Date(now.toISOString().split('T')[0]).toISOString().split('T')[0];
        const weekAgoDate = new Date(new Date().setDate(now.getDate() - 7));
        const weekAgoISO = new Date(weekAgoDate.toISOString().split('T')[0]).toISOString().split('T')[0];

        console.log("今天的 ISO 日期: " + todayISO);
        console.log("一周前的 ISO 日期: " + weekAgoISO);

        try {
            // 查询过去一周内的帖子
            const posts = await this.postModel.find({
                circle_id: circleId,
                $expr: {
                    $and: [
                        { $gte: [{ $dateFromString: { dateString: "$created_at" } }, new Date(weekAgoISO)] },
                        { $lte: [{ $dateFromString: { dateString: "$created_at" } }, new Date(todayISO)] }
                    ]
                }
            }).exec();

            console.log('过去一周的帖子有: ', JSON.stringify(posts, null, 2));

            // 使用类型断言
            const userIds = (posts as any[]).map((post: any) => post.author_id as number);
            console.log('发帖的用户有: ', JSON.stringify(userIds, null, 2));

            // 计算唯一的 user 数量
            const uniqueUserIds = [...new Set(userIds)];
            console.log("数量是 " + uniqueUserIds.length);

            return uniqueUserIds.length;
        } catch (error) {
            console.error('Error fetching active user count:', error);
            return 0; // 或者其他适当的错误处理
        }
    }
}
