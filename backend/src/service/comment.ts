import { Provide, Init } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Comment } from '../entity/comment';



@Provide()
export class CommentService {

    @InjectEntityModel(Comment)
    commentModel: ReturnModelType<typeof Comment>;

    private currentId = 0;

    @Init()
    async init() {
        const maxComment = await this.commentModel.findOne().sort({ id: -1 }).exec();
        if (maxComment) {
            this.currentId = maxComment.id;
        }
    }

    // 新增评论
    async addComment(postId: number, authorId: number, content: string) {
        const id = ++this.currentId;

        const now = new Date();
        const offset = 8 * 60;
        const chinaTime = new Date(now.getTime() + offset * 60 * 1000);

        const year = chinaTime.getUTCFullYear();
        const month = chinaTime.getUTCMonth() + 1; // 月份从0开始，所以要加1
        const day = chinaTime.getUTCDate();

        const result = `${year}-${month}-${day}`;


        const newComment = await this.commentModel.create({
            id: id,
            content: content,
            author_id: authorId,
            post_id: postId,
            created_at: result, // 直接传递 Date 对象

        } as Comment);

        console.log("新增了评论" + newComment)
        return newComment;


    }

    // 获取评论
    async getComments(postId: number) {
        const comments = await this.commentModel.find({ post_id: postId });
        return comments;
    }
    // 获取评论数量
    async getCommentCount(postId: number) {

        const count = await this.commentModel.countDocuments({ post_id: postId }).exec();
        //console.log("数量是" + count);
        return count;
    }

}