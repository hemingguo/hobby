import { Provide, Init } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Post } from '../entity/post';

@Provide()
export class PostService {

    @InjectEntityModel(Post)
    postModel: ReturnModelType<typeof Post>;

    private currentId = 0;

    @Init()
    async init() {
        const maxPost = await this.postModel.findOne().sort({ id: -1 }).exec();
        if (maxPost) {
            this.currentId = maxPost.id;
        }
    }

    async createPost(circle_id: number, content: string, imageUrl: string, author_id: number) {
        const id = ++this.currentId;

        const now = new Date();
        const offset = 8 * 60;
        const chinaTime = new Date(now.getTime() + offset * 60 * 1000);

        const year = chinaTime.getUTCFullYear();
        const month = chinaTime.getUTCMonth() + 1; // 月份从0开始，所以要加1
        const day = chinaTime.getUTCDate();

        const result = `${year}-${month}-${day}`;


        await this.postModel.create({
            id: id,
            content: content,
            author_id: author_id,
            imageUrl: imageUrl,
            circle_id: circle_id,
            created_at: result, // 直接传递 Date 对象
            updated_at: result, // 同上
            users: [], // 将 author_id 添加到 users 数组中
            likes: 0
        } as Post);
    }

    // 寻找circleId为number的所有帖子
    async findPostsByCircleId(circleId: number) {
        return this.postModel.find({ circle_id: circleId }).exec();
    }

    // 更新点赞数

    async updateLikes(postId: number, likes: number, userId: number, liked: boolean) {
        const post = await this.postModel.findOne({ id: postId });
        if (post) {
            post.likes = likes;
            if (liked) {
                console.log("点赞")
                if (!post.users.includes(userId)) {
                    post.users.push(userId);
                }
            } else {
                console.log("取消点赞 " + userId);
                console.log("之前 " + post.users);

               
            
                const numericUserId = Number(userId);

                post.users = post.users.filter(id => id !== numericUserId);

                console.log("之后 " + post.users);
            }
            await post.save();
            return { success: true };
        }
        return { success: false, message: 'Post not found' };
    }
}
