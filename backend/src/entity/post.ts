import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: { collection: 'Posts' }  // 设置集合名称
})
export class Post {
    @prop()
    public id?: number;

    @prop()
    circle_id?: number;

    @prop()
    author_id?: number;

    @prop()
    title?: string;

    @prop()
    content?: string;

    @prop()
    created_at?: Date;

    @prop()
    likes?: number;
}