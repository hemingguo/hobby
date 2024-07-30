import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: { collection: 'Posts' }  // 设置集合名称
})
export class Post {
    @prop()
    public id?: number;

    @prop()
    public circle_id?: number;

    @prop()
    public author_id?: number;

    @prop()
    public title?: string;

    @prop()
    public content?: string;

    @prop()
    public created_at?: string;

    @prop()
    public likes?: number;
}