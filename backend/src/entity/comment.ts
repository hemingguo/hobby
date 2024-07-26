import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: { collection: 'Comments' }  // 设置集合名称
})
export class Comment {
    @prop()
    public id?: number;

    @prop()
    public post_id?: number;

    @prop()
    public author_id?: number;

    @prop()
    public content?:string;

    @prop()
    public created_at?: Date;

  
}